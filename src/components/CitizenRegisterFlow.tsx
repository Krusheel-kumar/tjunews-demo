import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, UserCheck, Upload, MapPin } from 'lucide-react';
import { LOCATIONS_LIST } from '../mockData';

interface CitizenRegisterFlowProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const CitizenRegisterFlow: React.FC<CitizenRegisterFlowProps> = ({
  onBack,
  onSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('+91 98480 12345');
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [city, setCity] = useState('Hyderabad');
  const [locality, setLocality] = useState('Madhapur');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Step 2 OTP
  const [otp, setOtp] = useState(['4', '8', '2', '9']);

  // Step 3 Profile & Interests
  const [bio, setBio] = useState('Local civic volunteer and urban infrastructure enthusiast in Hyderabad.');
  const [interests, setInterests] = useState<string[]>(['Civic & Roads', 'Environment']);

  const interestOptions = [
    'Civic & Roads',
    'Environment',
    'Local Culture & Food',
    'Schools & Education',
    'Public Health',
    'Crime & Safety'
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 animate-fadeIn">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-serif font-black text-base text-gray-900">
            Citizen Reporter Registration
          </h2>
        </div>
        <span className="text-xs font-mono font-bold text-[#C9252D]">
          Step {step} of 4
        </span>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-[#C9252D] h-1 transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h3 className="font-serif font-black text-xl text-gray-900">
                Join TJ News Citizen Desk
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Provide your verified identity to submit local stories and civic updates.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9252D]/30 focus:outline-none"
                  placeholder="e.g. Ramesh Varma"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Mobile Number (For OTP)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9252D]/30 focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9252D]/30 focus:outline-none"
                  placeholder="name@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">City / District</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg"
                  >
                    {LOCATIONS_LIST.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Locality / Ward</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg"
                    placeholder="e.g. Madhapur"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="accent-[#C9252D] w-4 h-4 mt-0.5 rounded cursor-pointer"
                  />
                  <span className="text-[11px] text-gray-600 leading-tight">
                    I agree to the TJ News Contributor Guidelines, verify that submitted photos/news will be authentic, and grant editorial verification rights.
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!fullName || !phone || !agreedTerms}
              className="w-full mt-4 py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              Continue to OTP Verification →
            </button>
          </div>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="font-serif font-black text-xl text-gray-900">
                Verify Mobile Number
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter the 4-digit verification code sent to <span className="font-bold text-gray-800">{phone}</span>
              </p>
            </div>

            <div className="flex justify-center gap-3 py-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-12 h-14 text-center text-xl font-bold bg-white border-2 border-gray-300 rounded-lg focus:border-[#C9252D] focus:outline-none"
                />
              ))}
            </div>

            <div className="text-center text-xs text-gray-500">
              Demo Code Pre-filled: <span className="font-mono font-bold text-gray-700">4829</span>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition cursor-pointer"
            >
              Verify & Complete Contributor Profile →
            </button>
          </div>
        )}

        {/* STEP 3: Profile & Reporting Interests */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h3 className="font-serif font-black text-xl text-gray-900">
                Contributor Interests & Bio
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Help our editorial desk route your submissions to the right beat editors.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Reporting Interests (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {interestOptions.map((opt) => {
                  const isSelected = interests.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#C9252D] text-white border-[#C9252D]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Short Contributor Bio (Optional)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9252D]/30"
                placeholder="Mention any local organizations, resident associations or specialties..."
              />
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full mt-4 py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition cursor-pointer"
            >
              Submit Application For Approval →
            </button>
          </div>
        )}

        {/* STEP 4: Application Confirmation */}
        {step === 4 && (
          <div className="text-center py-6 space-y-4 animate-fadeIn bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border-2 border-amber-200">
              <ShieldCheck size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-full">
                Verification In Progress
              </span>
              <h3 className="font-serif font-black text-xl text-gray-900 pt-1">
                Citizen Reporter Profile Registered!
              </h3>
              <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                Thank you, <span className="font-bold">{fullName}</span>. Your contributor ID is <span className="font-mono font-bold text-gray-800">TJ-CR-8921</span>.
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-left text-xs text-gray-600 border border-gray-200 space-y-1">
              <div className="font-bold text-gray-800">Editorial Approval Notice:</div>
              <p className="text-[11px] leading-relaxed">
                All citizen contributor accounts undergo desk verification. You may submit civic reports right away; reports will be fact-checked by TJ News editors before appearing live on the news feed.
              </p>
            </div>

            <button
              onClick={onSuccess}
              className="w-full py-2.5 bg-[#C9252D] hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition cursor-pointer"
            >
              Go to Contributor Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
