// components/BillUpload.tsx

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Upload, FileText, Calculator, Plus, X, Calendar, Users } from "lucide-react";

interface BillUploadProps {
  onAnalyze: (data: any) => void;
}

interface MonthlyBillData {
  id: string;
  month: string;
  year: string;
  billType: 'TOU' | 'Tiered' | 'Flat' | '';
  // TOU fields
  peakKwh: string;
  offPeakKwh: string;
  midPeakKwh: string;
  // Tiered fields
  tier1Kwh: string;
  tier2Kwh: string;
  // Flat fields
  totalKwh: string;
  // Common fields
  totalCost: string;
  homeSize: string;
  residents: string;
  zipCode: string;
}

export function BillUpload({ onAnalyze }: BillUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [monthlyBills, setMonthlyBills] = useState<MonthlyBillData[]>([
    {
      id: '1',
      month: '',
      year: '',
      billType: '',
      peakKwh: '',
      offPeakKwh: '',
      midPeakKwh: '',
      tier1Kwh: '',
      tier2Kwh: '',
      totalKwh: '',
      totalCost: '',
      homeSize: '',
      residents: '',
      zipCode: ''
    }
  ]);

  const currentYear = new Date().getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addMonthlyBill = () => {
    const newBill: MonthlyBillData = {
      id: Date.now().toString(),
      month: '',
      year: '',
      billType: '',
      peakKwh: '',
      offPeakKwh: '',
      midPeakKwh: '',
      tier1Kwh: '',
      tier2Kwh: '',
      totalKwh: '',
      totalCost: '',
      homeSize: '',
      residents: '',
      zipCode: ''
    };
    setMonthlyBills(prev => [...prev, newBill]);
  };

  const removeMonthlyBill = (id: string) => {
    if (monthlyBills.length > 1) {
      setMonthlyBills(prev => prev.filter(bill => bill.id !== id));
    }
  };

  const updateMonthlyBill = (id: string, field: keyof MonthlyBillData, value: string) => {
    setMonthlyBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, [field]: value } : bill
    ));
  };

  const handleManualSubmit = () => {
    const validBills = monthlyBills.filter(bill => {
      const hasBasicInfo = bill.month && bill.year && bill.billType && bill.totalCost && bill.zipCode;
      const hasUsageData = bill.billType === 'TOU' ? (bill.peakKwh || bill.offPeakKwh || bill.midPeakKwh) :
                          bill.billType === 'Tiered' ? (bill.tier1Kwh || bill.tier2Kwh) :
                          bill.billType === 'Flat' ? bill.totalKwh : false;
      return hasBasicInfo && hasUsageData;
    });

    if (validBills.length > 0) {
      onAnalyze({
        type: 'manual',
        data: validBills
      });
    }
  };

  const handleFileSubmit = () => {
    if (selectedFiles.length > 0) {
      onAnalyze({
        type: 'file',
        data: selectedFiles
      });
    }
  };

  const handleDemoAnalysis = () => {
    // Simulate uploading sample bills with different types
    onAnalyze({
      type: 'demo',
      data: [
        {
          id: 'demo1',
          month: 'November',
          year: '2024',
          billType: 'TOU',
          peakKwh: '250',
          offPeakKwh: '400',
          midPeakKwh: '200',
          totalCost: '125',
          homeSize: '1200',
          residents: '3',
          zipCode: '10001'
        },
        {
          id: 'demo2',
          month: 'October',
          year: '2024',
          billType: 'TOU',
          peakKwh: '280',
          offPeakKwh: '380',
          midPeakKwh: '190',
          totalCost: '132',
          homeSize: '1200',
          residents: '3',
          zipCode: '10001'
        }
      ]
    });
  };

  const canSubmitManual = monthlyBills.some(bill => {
    const hasBasicInfo = bill.month && bill.year && bill.billType && bill.totalCost && bill.zipCode;
    const hasUsageData = bill.billType === 'TOU' ? (bill.peakKwh || bill.offPeakKwh || bill.midPeakKwh) :
                        bill.billType === 'Tiered' ? (bill.tier1Kwh || bill.tier2Kwh) :
                        bill.billType === 'Flat' ? bill.totalKwh : false;
    return hasBasicInfo && hasUsageData;
  });

  return (
    <div className="py-24 energy-bg relative overflow-hidden" id="demo">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-green-500/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-yellow-500/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-bounce-in">
          {/* <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Try Our Demo
            </span>
          </h2> */}
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Upload your energy bills or enter your usage details to get personalized energy-saving advice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-strong border border-white/10 p-2 rounded-2xl">
              <TabsTrigger 
                value="demo" 
                className="py-2 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Quick Demo
              </TabsTrigger>
              <TabsTrigger 
                value="upload"
                className="py-2 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300"
              >
                Upload Bills
              </TabsTrigger>
              <TabsTrigger 
                value="manual"
                className="py-2 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
              >
                Enter Manually
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="demo" className="space-y-6 animate-slide-up">
              <Card className="glass-strong border-white/10 hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    Try Sample Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    See how our AI works with sample Time-of-Use electricity bills from a 3-person household
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="glass border border-blue-400/30 p-6 rounded-xl mb-6">
                    <h4 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Sample Household:
                    </h4>
                    <ul className="text-gray-200 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        1,200 sq ft apartment in New York
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        3 residents
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        2 months of Time-of-Use billing data
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        Peak/Off-Peak/Mid-Peak usage tracking
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        Average monthly bill: $128
                      </li>
                    </ul>
                  </div>
                  <Button 
                    onClick={handleDemoAnalysis} 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                    size="lg"
                  >
                    🚀 Run Sample Analysis
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-green-600" />
                    Upload Your Energy Bills
                  </CardTitle>
                  <CardDescription>
                    Upload multiple PDFs or photos of your electricity bills. Our AI supports Time-of-Use, Tiered, and Flat rate bills.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="bill-upload"
                      multiple
                    />
                    <label htmlFor="bill-upload" className="cursor-pointer">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Click to upload your bills
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, PDF files • Multiple files allowed
                      </p>
                    </label>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files ({selectedFiles.length})</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button onClick={handleFileSubmit} className="w-full" size="lg">
                        Analyze {selectedFiles.length} Bill{selectedFiles.length > 1 ? 's' : ''}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    Enter Your Bill Details
                  </CardTitle>
                  <CardDescription>
                    Manually enter your energy usage information. Add multiple months for better analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {monthlyBills.map((bill, index) => (
                    <div key={bill.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">Month {index + 1}</span>
                        </div>
                        {monthlyBills.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMonthlyBill(bill.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Month</Label>
                          <Select value={bill.month} onValueChange={(value) => updateMonthlyBill(bill.id, 'month', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map(month => (
                                <SelectItem key={month} value={month}>{month}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Year</Label>
                          <Select value={bill.year} onValueChange={(value) => updateMonthlyBill(bill.id, 'year', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {[currentYear, currentYear - 1, currentYear - 2].map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Bill Type</Label>
                          <Select value={bill.billType} onValueChange={(value) => updateMonthlyBill(bill.id, 'billType', value as any)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select bill type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TOU">Time-of-Use (Peak/Off-Peak)</SelectItem>
                              <SelectItem value="Tiered">Tiered Pricing</SelectItem>
                              <SelectItem value="Flat">Flat Rate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Usage Data Based on Bill Type */}
                      {bill.billType === 'TOU' && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Time-of-Use Usage (kWh)
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-xs text-gray-600">Peak Usage</Label>
                              <Input
                                placeholder="e.g., 250"
                                value={bill.peakKwh}
                                onChange={(e) => updateMonthlyBill(bill.id, 'peakKwh', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Off-Peak Usage</Label>
                              <Input
                                placeholder="e.g., 400"
                                value={bill.offPeakKwh}
                                onChange={(e) => updateMonthlyBill(bill.id, 'offPeakKwh', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Mid-Peak Usage</Label>
                              <Input
                                placeholder="e.g., 200"
                                value={bill.midPeakKwh}
                                onChange={(e) => updateMonthlyBill(bill.id, 'midPeakKwh', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {bill.billType === 'Tiered' && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Tiered Usage (kWh)
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-gray-600">Tier 1 Usage</Label>
                              <Input
                                placeholder="e.g., 350"
                                value={bill.tier1Kwh}
                                onChange={(e) => updateMonthlyBill(bill.id, 'tier1Kwh', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Tier 2 Usage</Label>
                              <Input
                                placeholder="e.g., 500"
                                value={bill.tier2Kwh}
                                onChange={(e) => updateMonthlyBill(bill.id, 'tier2Kwh', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {bill.billType === 'Flat' && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Total Usage (kWh)
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                              <Input
                                placeholder="e.g., 850"
                                value={bill.totalKwh}
                                onChange={(e) => updateMonthlyBill(bill.id, 'totalKwh', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Common Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label>Total Bill ($)</Label>
                          <Input
                            placeholder="e.g., 125"
                            value={bill.totalCost}
                            onChange={(e) => updateMonthlyBill(bill.id, 'totalCost', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Home Size (sq ft)</Label>
                          <Input
                            placeholder="e.g., 1200"
                            value={bill.homeSize}
                            onChange={(e) => updateMonthlyBill(bill.id, 'homeSize', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Residents</Label>
                          <Input
                            placeholder="e.g., 3"
                            value={bill.residents}
                            onChange={(e) => updateMonthlyBill(bill.id, 'residents', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>ZIP Code</Label>
                          <Input
                            placeholder="e.g., 10001"
                            value={bill.zipCode}
                            onChange={(e) => updateMonthlyBill(bill.id, 'zipCode', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={addMonthlyBill}
                      className="flex-1"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Month
                    </Button>
                    <Button 
                      onClick={handleManualSubmit} 
                      className="flex-1" 
                      size="lg"
                      disabled={!canSubmitManual}
                    >
                      Analyze {monthlyBills.filter(bill => bill.month && bill.billType).length} Month{monthlyBills.filter(bill => bill.month && bill.billType).length !== 1 ? 's' : ''} of Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}