
"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Gift, Users } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { placeholderUsers } from '@/lib/placeholder-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for referrals - in a real app, this would come from your backend
const referralData = {
  referralCode: 'ALICE-WONDER-123',
  referrals: [
    { id: 'ref1', name: 'Charlie Brown', date: '2023-10-15', status: 'Completed', reward: '$10 Credit' },
    { id: 'ref2', name: 'Diana Prince', date: '2023-11-01', status: 'Pending', reward: '$10 Credit' },
  ],
  totalRewards: 10,
};

export default function ReferralsPage() {
  const { toast } = useToast();
  const [referralLink] = useState(`https://handyconnect.app/auth/signup?ref=${referralData.referralCode}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share your referral link.",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold mb-2">Refer & Earn Rewards</h1>
        <p className="text-lg text-muted-foreground">Share HandyConnect with friends and get rewarded!</p>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Your Referral Link</CardTitle>
          </div>
          <CardDescription>
            Share this link with your friends. When they sign up and complete their first task, you both get a reward.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input readOnly value={referralLink} className="bg-muted" />
            <Button onClick={handleCopy} size="icon" aria-label="Copy referral link">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary"/>
                <CardTitle className="font-headline text-2xl">Your Referrals</CardTitle>
            </div>
            <CardDescription>
                Track the status of your referrals and the rewards you've earned.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="mb-4">
                <p className="text-lg font-semibold">Total Rewards Earned: <span className="text-primary">${referralData.totalRewards}</span></p>
            </div>
            <Separator className="my-4"/>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referred User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralData.referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell className="font-medium">{referral.name}</TableCell>
                    <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            referral.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {referral.status}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">{referral.reward}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {referralData.referrals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">You haven't referred anyone yet. Share your link to get started!</p>
            )}
          </CardContent>
      </Card>

    </div>
  );
}
