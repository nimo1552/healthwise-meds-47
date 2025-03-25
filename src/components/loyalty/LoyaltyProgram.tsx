
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Gift, Star, History, CreditCard, Tag, Award, ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LoyaltyProgram = () => {
  const { toast } = useToast();
  const [points, setPoints] = useState(750);
  const [tier, setTier] = useState('Silver');
  const [nextTier, setNextTier] = useState('Gold');
  const [nextTierPoints, setNextTierPoints] = useState(1000);
  const [pointsHistory, setPointsHistory] = useState([
    { id: 1, date: '2023-11-10', description: 'Purchase: Order #ORD-123456', points: 250, type: 'earned' },
    { id: 2, date: '2023-10-25', description: 'Purchase: Order #ORD-123455', points: 180, type: 'earned' },
    { id: 3, date: '2023-10-15', description: 'Welcome Bonus', points: 500, type: 'earned' },
    { id: 4, date: '2023-10-17', description: 'Redeemed for $10 discount', points: 200, type: 'redeemed' }
  ]);
  
  const [availableRewards, setAvailableRewards] = useState([
    { id: 1, name: '$5 Discount', pointsCost: 100, description: 'Get $5 off your next purchase' },
    { id: 2, name: '$10 Discount', pointsCost: 200, description: 'Get $10 off your next purchase' },
    { id: 3, name: 'Free Shipping', pointsCost: 150, description: 'Free shipping on your next order' },
    { id: 4, name: '15% Off Supplements', pointsCost: 300, description: '15% discount on all supplements' },
    { id: 5, name: 'Priority Processing', pointsCost: 250, description: 'Get priority processing on your next order' }
  ]);
  
  const [selectedReward, setSelectedReward] = useState<null | { id: number; name: string; pointsCost: number; description: string }>(null);
  
  const handleRedeemPoints = () => {
    if (!selectedReward) return;
    
    if (points < selectedReward.pointsCost) {
      toast({
        title: "Not Enough Points",
        description: `You need ${selectedReward.pointsCost - points} more points to redeem this reward.`,
        variant: "destructive"
      });
      return;
    }
    
    // Update points
    setPoints(prevPoints => prevPoints - selectedReward.pointsCost);
    
    // Add to history
    const newHistoryEntry = {
      id: Math.max(...pointsHistory.map(h => h.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      description: `Redeemed for ${selectedReward.name}`,
      points: selectedReward.pointsCost,
      type: 'redeemed' as const
    };
    
    setPointsHistory(prevHistory => [newHistoryEntry, ...prevHistory]);
    
    // Show success message
    toast({
      title: "Reward Redeemed",
      description: `You've successfully redeemed ${selectedReward.pointsCost} points for ${selectedReward.name}.`
    });
    
    // Generate coupon code
    const couponCode = `NIM${Math.floor(1000 + Math.random() * 9000)}`;
    
    setTimeout(() => {
      toast({
        title: "Coupon Code Generated",
        description: `Your coupon code is: ${couponCode}. Use it at checkout.`
      });
    }, 1000);
    
    setSelectedReward(null);
  };
  
  const calculateProgress = () => {
    return (points / nextTierPoints) * 100;
  };
  
  const getTierBadge = () => {
    switch (tier) {
      case 'Bronze':
        return <Badge className="bg-amber-800 text-white border-0">Bronze</Badge>;
      case 'Silver':
        return <Badge className="bg-gray-400 text-white border-0">Silver</Badge>;
      case 'Gold':
        return <Badge className="bg-yellow-500 text-white border-0">Gold</Badge>;
      case 'Platinum':
        return <Badge className="bg-gray-700 text-white border-0">Platinum</Badge>;
      default:
        return <Badge>Member</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">NimoCare Rewards</h2>
        <p className="text-gray-600">Earn points with every purchase and redeem them for exclusive rewards</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Points Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Your Rewards Points</CardTitle>
                {getTierBadge()}
              </div>
              <CardDescription>Keep shopping to earn more points and unlock exclusive benefits</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-5">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-bold">{points}</p>
                    <p className="text-sm text-gray-500">Available Points</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Next Tier: {nextTier}</p>
                    <p className="text-sm font-medium">{nextTierPoints - points} points to go</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress value={calculateProgress()} className="h-2" />
                  <p className="text-xs text-gray-500 text-right">{Math.round(calculateProgress())}% to {nextTier}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/products" className="flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop to Earn More Points
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Available Rewards Card */}
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>Redeem your points for these exclusive rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableRewards.map((reward) => (
                  <div key={reward.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-nimocare-100 flex items-center justify-center flex-shrink-0">
                        <Gift className="h-5 w-5 text-nimocare-600" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{reward.name}</p>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant={points >= reward.pointsCost ? "default" : "outline"}
                          className={points >= reward.pointsCost ? "bg-nimocare-600 hover:bg-nimocare-700" : ""}
                          onClick={() => setSelectedReward(reward)}
                        >
                          {reward.pointsCost} pts
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Redeem Reward</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to redeem your points for this reward?
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedReward && (
                          <div className="py-4">
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                              <h4 className="font-semibold text-lg mb-1">{selectedReward.name}</h4>
                              <p className="text-gray-600 mb-3">{selectedReward.description}</p>
                              <div className="flex justify-between text-sm">
                                <span>Cost:</span>
                                <span className="font-medium">{selectedReward.pointsCost} points</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Your balance:</span>
                                <span className="font-medium">{points} points</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span>Balance after redemption:</span>
                                <span className="font-medium">{points - selectedReward.pointsCost} points</span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-500">
                              After redeeming, you'll receive a coupon code that you can use during checkout.
                            </p>
                          </div>
                        )}
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedReward(null)}>Cancel</Button>
                          <Button 
                            onClick={handleRedeemPoints}
                            disabled={!selectedReward || points < selectedReward.pointsCost}
                            className="bg-nimocare-600 hover:bg-nimocare-700"
                          >
                            Redeem Points
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Membership Tiers Card */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Tiers</CardTitle>
              <CardDescription>Exclusive benefits for each tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <Star className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <p className="font-medium">Bronze</p>
                      <p className="text-xs text-gray-500">0 - 500 points</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 pl-10 space-y-1">
                    <li>• Access to all rewards</li>
                    <li>• 1 point per $1 spent</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <Star className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Silver</p>
                      <p className="text-xs text-gray-500">500 - 1,000 points</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 pl-10 space-y-1">
                    <li>• All Bronze benefits</li>
                    <li>• 1.5 points per $1 spent</li>
                    <li>• Birthday bonus points</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Gold</p>
                      <p className="text-xs text-gray-500">1,000 - 2,500 points</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 pl-10 space-y-1">
                    <li>• All Silver benefits</li>
                    <li>• 2 points per $1 spent</li>
                    <li>• Exclusive gold-only rewards</li>
                    <li>• Free shipping on all orders</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Platinum</p>
                      <p className="text-xs text-gray-500">2,500+ points</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 pl-10 space-y-1">
                    <li>• All Gold benefits</li>
                    <li>• 2.5 points per $1 spent</li>
                    <li>• Dedicated customer support</li>
                    <li>• Early access to new products</li>
                    <li>• Special birthday gift</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pointsHistory.slice(0, 3).map((history) => (
                  <div key={history.id} className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{history.description}</p>
                      <p className="text-xs text-gray-500">{history.date}</p>
                    </div>
                    <p className={`font-medium ${history.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                      {history.type === 'earned' ? '+' : '-'}{history.points}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full flex justify-between">
                View Complete History
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
