import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MessageSquare, User, Calendar, IndianRupee, Clock } from 'lucide-react';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Sessions</h2>
          <p className="text-muted-foreground">
            View and manage your consultation history
          </p>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p>Loading sessions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Sessions</h2>
          <p className="text-muted-foreground">
            View and manage your consultation history
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl mb-2">No sessions yet</CardTitle>
            <CardDescription className="text-center max-w-sm">
              Start your first consultation to see session history and recommendations here.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Sessions</h2>
        <p className="text-muted-foreground">
          View and manage your consultation history ({sessions.length} sessions)
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">
                      {session.clientData.prospectName || 'Unnamed Client'}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(session.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Session #{session.sessionHash}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                  {session.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Age:</span>
                  <div className="font-medium">{session.clientData.age}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span>
                  <div className="font-medium capitalize">{session.clientData.gender}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Sum Assured:</span>
                  <div className="font-medium">{formatCurrency(session.clientData.basicSumAssured)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Premium Mode:</span>
                  <div className="font-medium capitalize">{session.clientData.premiumMode}</div>
                </div>
              </div>

              {session.clientData.lifeAssuredName && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Life Assured:</span>
                  <span className="ml-2 font-medium">{session.clientData.lifeAssuredName}</span>
                </div>
              )}

              {session.clientData.requirement && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Requirements:</span>
                  <p className="mt-1 text-sm bg-muted p-2 rounded">{session.clientData.requirement}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Recommendations ({session.recommendations.length})</h4>
                <div className="space-y-2">
                  {session.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div>
                        <span className="font-medium">{rec.policyName}</span>
                        <span className="text-sm text-muted-foreground ml-2">by {rec.insurer}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(rec.pricing.installmentYear1)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Score: {(rec.score * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MySessions;