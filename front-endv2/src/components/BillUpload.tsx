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
  // TOU
  peakRate: string;
  peakTotal: string;
  offPeakRate: string;
  offPeakTotal: string;
  midPeakRate: string;
  midPeakTotal: string;
  // Tiered
  tier1Rate: string;
  tier1Total: string;
  tier2Rate: string;
  tier2Total: string;
  // Flat
  flatRate: string;
  flatTotal: string;
  // Common
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
      peakRate: '',
      peakTotal: '',
      offPeakRate: '',
      offPeakTotal: '',
      midPeakRate: '',
      midPeakTotal: '',
      tier1Rate: '',
      tier1Total: '',
      tier2Rate: '',
      tier2Total: '',
      flatRate: '',
      flatTotal: '',
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
      peakRate: '',
      peakTotal: '',
      offPeakRate: '',
      offPeakTotal: '',
      midPeakRate: '',
      midPeakTotal: '',
      tier1Rate: '',
      tier1Total: '',
      tier2Rate: '',
      tier2Total: '',
      flatRate: '',
      flatTotal: '',
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
      const hasBasicInfo = bill.month && bill.year && bill.billType && bill.zipCode;
      const hasUsageData = bill.billType === 'TOU' ?
        (bill.peakRate || bill.peakTotal || bill.offPeakRate || bill.offPeakTotal || bill.midPeakRate || bill.midPeakTotal) :
        bill.billType === 'Tiered' ?
          (bill.tier1Rate || bill.tier1Total || bill.tier2Rate || bill.tier2Total) :
        bill.billType === 'Flat' ? (bill.flatRate || bill.flatTotal) : false;
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
    onAnalyze({
      type: 'demo',
      data: [
        {
          id: 'demo1',
          month: 'November',
          year: '2024',
          billType: 'TOU',
          peakRate: '0.20',
          peakTotal: '50',
          offPeakRate: '0.10',
          offPeakTotal: '30',
          midPeakRate: '0.15',
          midPeakTotal: '40',
          tier1Rate: '',
          tier1Total: '',
          tier2Rate: '',
          tier2Total: '',
          flatRate: '',
          flatTotal: '',
          homeSize: '1200',
          residents: '3',
          zipCode: '10001'
        },
        {
          id: 'demo2',
          month: 'October',
          year: '2024',
          billType: 'Tiered',
          peakRate: '',
          peakTotal: '',
          offPeakRate: '',
          offPeakTotal: '',
          midPeakRate: '',
          midPeakTotal: '',
          tier1Rate: '0.12',
          tier1Total: '42',
          tier2Rate: '0.18',
          tier2Total: '60',
          flatRate: '',
          flatTotal: '',
          homeSize: '1200',
          residents: '3',
          zipCode: '10001'
        }
      ]
    });
  };

  // Add a new state for common info
  const [commonInfo, setCommonInfo] = useState({
    homeSize: '',
    kindOfHome: '',
    adults: '',
    children: '',
    zipCode: '', 
    annualIncome: ''
  });

  // Update handler
  const updateCommonInfo = (field: 'homeSize' | 'kindOfHome' | 'adults' | 'children' | 'zipCode' | 'annualIncome', value: string) => {
    setCommonInfo(prev => ({ ...prev, [field]: value }));
  };

  const canSubmitManual = monthlyBills.some(bill => {
    const hasBasicInfo = bill.month && bill.year && bill.billType && bill.zipCode;
    const hasUsageData = bill.billType === 'TOU' ?
      (bill.peakRate || bill.peakTotal || bill.offPeakRate || bill.offPeakTotal || bill.midPeakRate || bill.midPeakTotal) :
      bill.billType === 'Tiered' ?
        (bill.tier1Rate || bill.tier1Total || bill.tier2Rate || bill.tier2Total) :
      bill.billType === 'Flat' ? (bill.flatRate || bill.flatTotal) : false;
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
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Enter your information below to get personalized energy-saving advice.
          </p>
        </div>
        {/* Common Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs mb-1 block">Home Size (sq ft)</Label>
              <Input
                placeholder="1200"
                value={commonInfo.homeSize}
                onChange={(e) => updateCommonInfo('homeSize', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Type of Home</Label>
              <Input
                placeholder="3"
                value={commonInfo.kindOfHome}
                onChange={(e) => updateCommonInfo('kindOfHome', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">ZIP Code</Label>
              <Input
                placeholder="10001"
                value={commonInfo.zipCode}
                onChange={(e) => updateCommonInfo('zipCode', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs mb-1 block"># of Adults</Label>
              <Input
                placeholder="1200"
                value={commonInfo.adults}
                onChange={(e) => updateCommonInfo('adults', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block"># of Children</Label>
              <Input
                placeholder="3"
                value={commonInfo.children}
                onChange={(e) => updateCommonInfo('children', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Annual Income</Label>
              <Input
                placeholder="10001"
                value={commonInfo.annualIncome}
                onChange={(e) => updateCommonInfo('annualIncome', e.target.value)}
              />
            </div>
          </div>

          {/* Add space after final row */}
          <div className="h-6"></div>
        </div>
        <div className="text-center mb-16 animate-bounce-in">
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Upload your energy bills or enter your usage details to get personalized energy-saving advice.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="flex justify-center items-center w-full grid-cols-3 glass-strong border border-white/10 p-1 rounded-2xl">
              <TabsTrigger 
                value="demo" 
                className="py-2 px-4 text-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Quick Demo
              </TabsTrigger>
              <TabsTrigger 
                value="upload"
                className="py-2 px-4 text-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300"
              >
                Upload Bills
              </TabsTrigger>
              <TabsTrigger 
                value="manual"
                className="py-2 px-4 text-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
              >
                Enter Manually
              </TabsTrigger>
            </TabsList>
            
            {/* Demo Content */}
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
                    See how our AI works with sample Time-of-Use and Tiered electricity bills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="glass border border-blue-400/30 p-6 rounded-xl mb-6">
                    <h4 className="font-semibold text-blue-300 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Sample Household:
                    </h4>
                    <ul className="text-gray-200 space-y-2">
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div>1,200 sq ft apartment in New York</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div>3 residents</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>2 months of billing data (TOU & Tiered)</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>Rates and totals tracked per category</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-pink-400 rounded-full"></div>Average monthly bill: $128</li>
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

            {/* Upload Content */}
            <TabsContent value="upload" className="space-y-6 animate-slide-up">
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
                      <p className="text-gray-600 mb-2">Click to upload your bills</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG, PDF files • Multiple files allowed</p>
                    </label>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files ({selectedFiles.length})</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
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

            {/* Manual Entry Content */}
            <TabsContent value="manual" className="space-y-6 animate-slide-up">
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
                          <Button variant="ghost" size="sm" onClick={() => removeMonthlyBill(bill.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Month</Label>
                          <Select value={bill.month} onValueChange={(value) => updateMonthlyBill(bill.id, 'month', value)}>
                            <SelectTrigger><SelectValue placeholder="Select month" /></SelectTrigger>
                            <SelectContent>{months.map(month => <SelectItem key={month} value={month}>{month}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Year</Label>
                          <Select value={bill.year} onValueChange={(value) => updateMonthlyBill(bill.id, 'year', value)}>
                            <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                            <SelectContent>{[currentYear, currentYear-1, currentYear-2].map(year => <SelectItem key={year} value={year.toString()}>{year}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Bill Type</Label>
                          <Select value={bill.billType} onValueChange={(value) => updateMonthlyBill(bill.id, 'billType', value as any)}>
                            <SelectTrigger><SelectValue placeholder="Select bill type" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TOU">Time-of-Use (Peak/Off-Peak/Mid-Peak)</SelectItem>
                              <SelectItem value="Tiered">Tiered Pricing</SelectItem>
                              <SelectItem value="Flat">Flat Rate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Usage Fields by Bill Type */}
                      {bill.billType === 'TOU' && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Time-of-Use Rates & Totals</Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-xs mb-1 block">Peak Rate ($/kWh)</Label>
                              <Input placeholder="0.20" value={bill.peakRate} onChange={(e) => updateMonthlyBill(bill.id, 'peakRate', e.target.value)} className="text-gray-600"/>
                              <Label className="text-xs mb-1 block mt-2">Peak Total ($)</Label>
                              <Input placeholder="50" value={bill.peakTotal} onChange={(e) => updateMonthlyBill(bill.id, 'peakTotal', e.target.value)} className="text-gray-600"/>
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">Off-Peak Rate ($/kWh)</Label>
                              <Input placeholder="0.10" value={bill.offPeakRate} onChange={(e) => updateMonthlyBill(bill.id, 'offPeakRate', e.target.value)} className="text-gray-600"/>
                              <Label className="text-xs mb-1 block mt-2">Off-Peak Total ($)</Label>
                              <Input placeholder="30" value={bill.offPeakTotal} onChange={(e) => updateMonthlyBill(bill.id, 'offPeakTotal', e.target.value)} className="text-gray-600"/>
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">Mid-Peak Rate ($/kWh)</Label>
                              <Input placeholder="0.15" value={bill.midPeakRate} onChange={(e) => updateMonthlyBill(bill.id, 'midPeakRate', e.target.value)} className="text-gray-600"/>
                              <Label className="text-xs mb-1 block mt-2">Mid-Peak Total ($)</Label>
                              <Input placeholder="40" value={bill.midPeakTotal} onChange={(e) => updateMonthlyBill(bill.id, 'midPeakTotal', e.target.value)} className="text-gray-600"/>
                            </div>
                          </div>
                        </div>
                      )}

                      {bill.billType === 'Tiered' && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Tiered Rates & Totals</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs mb-1 block">Tier 1 Rate ($/kWh)</Label>
                              <Input placeholder="0.12" value={bill.tier1Rate} onChange={(e) => updateMonthlyBill(bill.id, 'tier1Rate', e.target.value)} className="text-gray-600"/>
                              <Label className="text-xs mb-1 block mt-2">Tier 1 Total ($)</Label>
                              <Input placeholder="42" value={bill.tier1Total} onChange={(e) => updateMonthlyBill(bill.id, 'tier1Total', e.target.value)} className="text-gray-600"/>
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">Tier 2 Rate ($/kWh)</Label>
                              <Input placeholder="0.18" value={bill.tier2Rate} onChange={(e) => updateMonthlyBill(bill.id, 'tier2Rate', e.target.value)} className="text-gray-600"/>
                              <Label className="text-xs mb-1 block mt-2">Tier 2 Total ($)</Label>
                              <Input placeholder="60" value={bill.tier2Total} onChange={(e) => updateMonthlyBill(bill.id, 'tier2Total', e.target.value)} className="text-gray-600"/>
                            </div>
                          </div>
                        </div>
                      )}

                      {bill.billType === 'Flat' && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Flat Rate & Total</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs mb-1 block">Rate ($/kWh)</Label>
                              <Input placeholder="0.15" value={bill.flatRate} onChange={(e) => updateMonthlyBill(bill.id, 'flatRate', e.target.value)} className="text-gray-600"/>
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">Total ($)</Label>
                              <Input placeholder="85" value={bill.flatTotal} onChange={(e) => updateMonthlyBill(bill.id, 'flatTotal', e.target.value)} className="text-gray-600"/>
                            </div>
                          </div>
                        </div>
                      )}

                
                    </div>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={addMonthlyBill} className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Month
                    </Button>
                    <Button onClick={handleManualSubmit} className="flex-1" size="lg" disabled={!canSubmitManual}>
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
