import { useState, useRef } from "react";
import { useTheme } from "../../settings/ThemeContext";
import { API_URL } from "../../../config";
import { Toast } from 'primereact/toast';

const initialForm = {
  date: "",
  enrollmentId: "",
  personalInformation: {
    fullName: "",
    dateOfBirth: "",
    age: "",
    contactNumber: "",
    emailAddress: "",
    permanentAddress: { line1: "", line2: "" },
    emergencyContact: { name: "", phone: "" },
  },
  academicAndProfessionalBackground: {
    highestQualification: "",
    currentOccupation: "",
  },
  courseDetails: {
    courseEnrolled: "",
    modeOfClass: "",
    batchTiming: "",
    tradingExperience: "",
  },

  declaration: {
    informationCorrect: false,
    agreeToRules: false,
    noRefundPolicyAccepted: false,
  },
};

const steps = [
  { id: 1, label: "Personal Info", icon: "👤" },
  { id: 2, label: "Academic", icon: "🎓" },
  { id: 3, label: "Course", icon: "📚" },
  { id: 4, label: "Declaration", icon: "✍️" },
];

// ── Label component (MUST be outside the main function to avoid remounting) ──
const InputField = ({ label, required, children, hint }) => (
  <div className="mb-5">
    <label
      className="block text-[11px] font-bold uppercase tracking-widest mb-1.5"
      style={{ color: "#A5B4FC" }}
    >
      {label} {required && <span style={{ color: "#f87171" }}>*</span>}
    </label>
    {children}
    {hint && (
      <p className="mt-1 text-[11px] opacity-45">
        {hint}
      </p>
    )}
  </div>
);

export default function EnrollmentForm() {
  const toast = useRef(null);
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // ── Derived style tokens ──────────────────────────────────────
  const accent = "#A5B4FC";
  const accentDim = "rgba(165,180,252,0.15)";
  const accentBorder = "rgba(165,180,252,0.35)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const mutedText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const subtleText = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)";

  // Input / select base class
  const inputClass = `w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200
    border focus:border-[#A5B4FC] focus:ring-2 focus:ring-[#A5B4FC]/20
    ${isDark
      ? "bg-white/5 border-white/10 text-white placeholder-white/30"
      : "bg-black/3 border-black/10 text-black placeholder-black/30"
    }`;

  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  const set = (path, value) => {
    setForm((prev) => {
      const keys = path.split(".");
      const updated = { ...prev };
      let ref = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return updated;
    });
  };


  const handleSubmit = async () => {
    // Basic validation
    if (!form.personalInformation.fullName || !form.personalInformation.emailAddress || !form.courseDetails.courseEnrolled) {
      toast.current.show({
        severity: 'warn',
        summary: 'Incomplete Form',
        detail: 'Please provide at least your Name, Email, and Course.',
        life: 3000
      });
      return;
    }

    // Map form to backend schema
    const payload = {
      fullName: form.personalInformation.fullName,
      dob: form.personalInformation.dateOfBirth,
      age: parseInt(form.personalInformation.age) || 0,
      contactNo: form.personalInformation.contactNumber,
      email: form.personalInformation.emailAddress,
      address1: form.personalInformation.permanentAddress.line1,
      address2: form.personalInformation.permanentAddress.line2,
      emergencyContact: {
        name: form.personalInformation.emergencyContact.name,
        contactNo: form.personalInformation.emergencyContact.phone
      },
      qualification: form.academicAndProfessionalBackground.highestQualification,
      occupation: form.academicAndProfessionalBackground.currentOccupation,
      experience: form.courseDetails.tradingExperience,
      courseEnrolled: form.courseDetails.courseEnrolled,
      modeOfClass: form.courseDetails.modeOfClass.includes('Online') ? 'Online' :
        form.courseDetails.modeOfClass.includes('Offline') ? 'Offline' : 'Hybrid',
      batchTiming: form.courseDetails.batchTiming,
      declaration: Object.values(form.declaration).every(Boolean)
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        toast.current.show({
          severity: 'success',
          summary: 'Enrollment Successful',
          detail: 'Welcome to Trader Nation! Your form has been submitted.',
          life: 5000
        });
        setForm(initialForm);
        setStep(1);
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Submission Failed',
          detail: result.error || 'Check all fields and try again.',
          life: 4000
        });
      }
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      toast.current.show({
        severity: 'error',
        summary: 'Server Error',
        detail: 'Could not connect to the academy server.',
        life: 4000
      });
    } finally {
      setLoading(false);
    }
  };


  // ── Main Form ─────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen py-24 px-4 font-inter"
      style={{ background: colors.background }}
    >
      <Toast ref={toast} position="top-right" />
      <style>{`
        .step-active-pill {
          background: #A5B4FC;
          color: #050810;
          box-shadow: 0 4px 18px rgba(165,180,252,0.45);
          transform: scale(1.1);
        }
        .step-done-pill {
          background: rgba(165,180,252,0.2);
          color: #A5B4FC;
          border: 1px solid rgba(165,180,252,0.4);
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: ${isDark ? "invert(1) opacity(0.5)" : "opacity(0.5)"};
          cursor: pointer;
        }
        select option {
          background: ${isDark ? "#0d0d0d" : "#ffffff"};
          color: ${isDark ? "#ffffff" : "#000000"};
        }
      `}</style>

      {/* ── Page Header ── */}
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <div
          className="inline-flex items-center gap-2 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4 border"
          style={{ background: accentDim, color: accent, borderColor: accentBorder }}
        >
          📊 Trading Academy
        </div>
        <h1
          className="text-4xl font-bold leading-tight"
          style={{ color: colors.text }}
        >
          Course Enrollment Form
        </h1>
        <p className="text-sm mt-2" style={{ color: mutedText }}>
          Fill in your details to begin your trading journey
        </p>
      </div>

      {/* ── Step Indicator ── */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between relative">
          <div
            className="absolute left-0 right-0 top-5 h-px z-0 mx-8"
            style={{ background: borderColor }}
          />
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center z-10 flex-1">
              <button
                onClick={() => setStep(s.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step === s.id
                  ? "step-active-pill"
                  : step > s.id
                    ? "step-done-pill"
                    : ""
                  }`}
                style={
                  step !== s.id && step <= s.id
                    ? {
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                      color: mutedText,
                      border: `1px solid ${borderColor}`,
                    }
                    : {}
                }
              >
                {step > s.id ? "✓" : s.icon}
              </button>
              <span
                className="text-[11px] mt-1.5 font-medium"
                style={{ color: step === s.id ? accent : mutedText }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Card ── */}
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden border"
          style={{
            background: cardBg,
            borderColor,
            boxShadow: isDark
              ? "0 20px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          {/* Card Header */}
          <div
            className="px-8 py-5 border-b flex justify-between items-center"
            style={{
              background: accentDim,
              borderColor: accentBorder,
            }}
          >
            <div>
              <h2
                className="font-bold text-lg"
                style={{ color: accent }}
              >
                {steps[step - 1].label}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: mutedText }}>
                Step {step} of {steps.length}
              </p>
            </div>


          </div>

          {/* Card Body */}
          <div className="px-8 py-8">
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <div>
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="col-span-2">
                    <InputField label="Full Name" required>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={form.personalInformation.fullName}
                        onChange={(e) => set("personalInformation.fullName", e.target.value)}
                        className={inputClass}
                      />
                    </InputField>
                  </div>
                  <InputField label="Date of Birth" required>
                    <input
                      type="date"
                      value={form.personalInformation.dateOfBirth}
                      onChange={(e) => set("personalInformation.dateOfBirth", e.target.value)}
                      className={inputClass}
                    />
                  </InputField>
                  <InputField label="Age">
                    <input
                      type="number"
                      placeholder="e.g. 28"
                      value={form.personalInformation.age}
                      onChange={(e) => set("personalInformation.age", e.target.value)}
                      className={inputClass}
                    />
                  </InputField>
                  <InputField label="Contact Number" required>
                    <input
                      type="tel"
                      placeholder="+91 99999 00000"
                      value={form.personalInformation.contactNumber}
                      onChange={(e) => set("personalInformation.contactNumber", e.target.value)}
                      className={inputClass}
                    />
                  </InputField>
                  <InputField label="Email Address" required>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.personalInformation.emailAddress}
                      onChange={(e) => set("personalInformation.emailAddress", e.target.value)}
                      className={inputClass}
                    />
                  </InputField>
                  <InputField label="Address Line 1">
                    <input
                      type="text"
                      placeholder="Flat / House No., Street"
                      value={form.personalInformation.permanentAddress.line1}
                      onChange={(e) => set("personalInformation.permanentAddress.line1", e.target.value)}
                      className={inputClass}
                    />
                  </InputField>
                  <InputField label="Address Line 2">
                    <input
                      type="text"
                      placeholder="City, State, Pincode"
                      value={form.personalInformation.permanentAddress.line2}
                      onChange={(e) => set("personalInformation.permanentAddress.line2", e.target.value)}
                      className={inputClass}
                    />
                  </InputField>
                </div>

                {/* Emergency Contact */}
                <div
                  className="mt-2 p-4 rounded-2xl border"
                  style={{ background: accentDim, borderColor: accentBorder }}
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-widest mb-3"
                    style={{ color: accent }}
                  >
                    🆘 Emergency Contact
                  </p>
                  <div className="grid grid-cols-2 gap-x-6">
                    <InputField label="Contact Name">
                      <input
                        type="text"
                        placeholder="Parent / Spouse Name"
                        value={form.personalInformation.emergencyContact.name}
                        onChange={(e) => set("personalInformation.emergencyContact.name", e.target.value)}
                        className={inputClass}
                      />
                    </InputField>
                    <InputField label="Contact Phone">
                      <input
                        type="tel"
                        placeholder="+91 88888 00000"
                        value={form.personalInformation.emergencyContact.phone}
                        onChange={(e) => set("personalInformation.emergencyContact.phone", e.target.value)}
                        className={inputClass}
                      />
                    </InputField>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Academic */}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-x-6">
                <InputField label="Highest Qualification" required>
                  <select
                    value={form.academicAndProfessionalBackground.highestQualification}
                    onChange={(e) => set("academicAndProfessionalBackground.highestQualification", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Qualification</option>
                    <option>10th Pass</option>
                    <option>12th Pass</option>
                    <option>Diploma</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                    <option>Other</option>
                  </select>
                </InputField>
                <InputField label="Current Occupation" required>
                  <select
                    value={form.academicAndProfessionalBackground.currentOccupation}
                    onChange={(e) => set("academicAndProfessionalBackground.currentOccupation", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Occupation</option>
                    <option>Student</option>
                    <option>Salaried Employee</option>
                    <option>Business Owner</option>
                    <option>Freelancer</option>
                    <option>Homemaker</option>
                    <option>Retired</option>
                    <option>Other</option>
                  </select>
                </InputField>
                <div
                  className="col-span-2 mt-4 p-6 rounded-2xl border text-center"
                  style={{ background: accentDim, borderColor: accentBorder }}
                >
                  <p className="text-4xl mb-2">🎓</p>
                  <p className="text-sm" style={{ color: subtleText }}>
                    Your academic background helps us understand your learning context and tailor the course experience.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Course */}
            {step === 3 && (
              <div className="grid grid-cols-2 gap-x-6">
                <InputField label="Course Enrolled" required>
                  <select
                    value={form.courseDetails.courseEnrolled}
                    onChange={(e) => set("courseDetails.courseEnrolled", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Course</option>
                    <option>Full Stack Development</option>
                    <option>Forex Master Bundle</option>
                    <option>Stock Market Basics</option>
                    <option>Advanced Trading</option>
                  </select>
                </InputField>
                <InputField label="Mode of Class" required>
                  <select
                    value={form.courseDetails.modeOfClass}
                    onChange={(e) => set("courseDetails.modeOfClass", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Mode</option>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Hybrid</option>
                  </select>
                </InputField>
                <InputField label="Batch Timing" required>
                  <select
                    value={form.courseDetails.batchTiming}
                    onChange={(e) => set("courseDetails.batchTiming", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Batch</option>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>Morning: 7:00 AM – 9:00 AM</option>
                    <option>Morning: 9:00 AM – 11:00 AM</option>
                    <option>Afternoon: 12:00 PM – 2:00 PM</option>
                    <option>Evening: 5:00 PM – 7:00 PM</option>
                    <option>Evening: 7:00 PM – 9:00 PM</option>
                    <option>Weekend Batch</option>
                  </select>
                </InputField>
                <InputField label="Trading Experience">
                  <select
                    value={form.courseDetails.tradingExperience}
                    onChange={(e) => set("courseDetails.tradingExperience", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select Experience Level</option>
                    <option>Fresher</option>
                    <option>Complete Beginner</option>
                    <option>Less than 6 Months</option>
                    <option>6 Months – 1 Year</option>
                    <option>1 – 3 Years</option>
                    <option>3+ Years</option>
                  </select>
                </InputField>
              </div>
            )}

            {/* STEP 4: Declaration & Verification */}
            {step === 4 && (
              <div>
                <div className="space-y-3 mb-6">
                  {[
                    { key: "informationCorrect", label: "I hereby declare that all the information provided in this form is true, correct and complete to the best of my knowledge." },
                    { key: "agreeToRules", label: "I have read and agree to abide by all the rules, regulations, and code of conduct of the Trading Academy." },
                    { key: "noRefundPolicyAccepted", label: "I understand and accept the No Refund Policy. Fees once paid will not be refunded under any circumstances." },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200"
                      style={{
                        background: form.declaration[item.key] ? accentDim : cardBg,
                        borderColor: form.declaration[item.key] ? accentBorder : borderColor,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={form.declaration[item.key]}
                        onChange={(e) => set(`declaration.${item.key}`, e.target.checked)}
                        className="mt-0.5 w-4 h-4 shrink-0"
                        style={{ accentColor: accent }}
                      />
                      <span className="text-sm" style={{ color: subtleText }}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Declaration status banner */}
                <div
                  className="p-4 rounded-xl text-sm border"
                  style={{
                    background: Object.values(form.declaration).every(Boolean)
                      ? "rgba(165,180,252,0.15)"
                      : cardBg,
                    borderColor: Object.values(form.declaration).every(Boolean)
                      ? accentBorder
                      : borderColor,
                    color: Object.values(form.declaration).every(Boolean)
                      ? accent
                      : mutedText,
                  }}
                >
                  {Object.values(form.declaration).every(Boolean)
                    ? "✅ All declarations accepted. You may submit the form."
                    : "⚠️ Please accept all three declarations to proceed with submission."}
                </div>
              </div>
            )}
          </div>

          {/* ── Navigation Footer ── */}
          <div
            className="px-8 py-5 border-t flex justify-between items-center"
            style={{ borderColor, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}
          >
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                borderColor,
                color: subtleText,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              ← Previous
            </button>

            {/* Progress dots */}
            <div className="flex gap-1">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: step === s.id ? "24px" : "8px",
                    background:
                      step === s.id
                        ? accent
                        : step > s.id
                          ? "rgba(165,180,252,0.4)"
                          : isDark
                            ? "rgba(255,255,255,0.15)"
                            : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: accent,
                  color: "#050810",
                  boxShadow: "0 4px 18px rgba(165,180,252,0.35)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!Object.values(form.declaration).every(Boolean) || loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: accent,
                  color: "#050810",
                  boxShadow: "0 4px 18px rgba(165,180,252,0.35)",
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) e.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {loading ? 'Submitting...' : '✅ Submit Enrollment'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
