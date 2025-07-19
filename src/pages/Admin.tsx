import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Eye, Edit, Clock, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Admin = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      name: "Sunset Viewpoint",
      category: "attraction",
      description: "Amazing sunset views over the mountains, perfect for photography and romantic evenings.",
      submittedBy: "Local Guide Sarah",
      submittedDate: "2024-01-15",
      status: "pending",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop",
      address: "Mountain Road, Yala",
      phone: "+66 81 234 5678",
      openHours: "5:00 AM - 8:00 PM"
    },
    {
      id: 2,
      name: "Traditional Coffee House",
      category: "restaurant",
      description: "Family-owned coffee shop serving traditional Thai coffee and local snacks for over 30 years.",
      submittedBy: "Coffee Lover Mike",
      submittedDate: "2024-01-14",
      status: "pending",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop",
      address: "Old Market Street, Yala",
      phone: "+66 82 345 6789",
      openHours: "6:00 AM - 6:00 PM"
    },
    {
      id: 3,
      name: "Heritage Museum",
      category: "attraction",
      description: "Small museum showcasing local history and cultural artifacts of the Yala region.",
      submittedBy: "History Buff Tom",
      submittedDate: "2024-01-13",
      status: "approved",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
      address: "Cultural Center, Yala",
      phone: "+66 83 456 7890",
      openHours: "9:00 AM - 5:00 PM"
    }
  ]);

  const handleApprove = (id: number) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status: "approved" } : sub
    ));
    toast({
      title: "Submission approved!",
      description: "The place is now live on YalaLike.",
    });
  };

  const handleReject = (id: number) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status: "rejected" } : sub
    ));
    toast({
      title: "Submission rejected",
      description: "The submitter will be notified.",
      variant: "destructive"
    });
  };

  const pendingSubmissions = submissions.filter(sub => sub.status === "pending");
  const approvedSubmissions = submissions.filter(sub => sub.status === "approved");
  const rejectedSubmissions = submissions.filter(sub => sub.status === "rejected");

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      mosque: "🕌",
      restaurant: "🍜",
      hotel: "🏨",
      transport: "🚐",
      attraction: "🎯",
      shopping: "🛒",
      entertainment: "🎭"
    };
    return icons[category] || "📍";
  };

  const SubmissionCard = ({ submission, showActions = true }: { submission: any, showActions?: boolean }) => (
    <Card className="shadow-card">
      <div className="flex">
        <img
          src={submission.image}
          alt={submission.name}
          className="w-32 h-32 object-cover rounded-l-lg"
        />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{submission.name}</h3>
              <Badge variant="outline" className="mt-1">
                {getCategoryIcon(submission.category)} {submission.category}
              </Badge>
            </div>
            <Badge variant={
              submission.status === "approved" ? "default" : 
              submission.status === "rejected" ? "destructive" : "secondary"
            }>
              {submission.status}
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3">{submission.description}</p>
          
          <div className="space-y-1 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              {submission.address}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              {submission.phone}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              {submission.openHours}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mb-3">
            Submitted by {submission.submittedBy} on {submission.submittedDate}
          </div>
          
          {showActions && submission.status === "pending" && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleApprove(submission.id)}
                className="bg-secondary hover:bg-secondary/90"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleReject(submission.id)}
              >
                <XCircle className="h-3 w-3 mr-1" />
                Reject
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Manage community submissions and content
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{pendingSubmissions.length}</div>
              <p className="text-sm text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{approvedSubmissions.length}</div>
              <p className="text-sm text-muted-foreground">Live on platform</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{submissions.length}</div>
              <p className="text-sm text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pending ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedSubmissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Pending Submissions</CardTitle>
                <CardDescription>Review and approve new place submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingSubmissions.length > 0 ? (
                  <div className="space-y-4">
                    {pendingSubmissions.map((submission) => (
                      <SubmissionCard key={submission.id} submission={submission} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No pending submissions at the moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Approved Places</CardTitle>
                <CardDescription>Places currently live on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedSubmissions.map((submission) => (
                    <SubmissionCard key={submission.id} submission={submission} showActions={false} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Rejected Submissions</CardTitle>
                <CardDescription>Submissions that didn't meet the guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rejectedSubmissions.map((submission) => (
                    <SubmissionCard key={submission.id} submission={submission} showActions={false} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;