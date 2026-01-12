import type { AnalysisResult } from "./types";

export const mockAnalyses: { [key: string]: AnalysisResult } = {
  "pan-card-form": {
    fieldNames: ["Full Name", "Father's Name", "Date of Birth", "Address", "Aadhaar Number"],
    originalTerms: ["Assessing Officer", "Jurisdiction", "Indemnity"],
    simplifiedExplanations: [
      "The tax officer who will handle your file.",
      "The geographical area your tax office covers.",
      "A promise to cover any losses.",
    ],
    requiredActions: ["Fill all mandatory fields", "Attach photograph", "Signature required", "Attach Proof of Identity", "Attach Proof of Address"],
    verifiedResources: ["https://www.incometaxindia.gov.in/pages/pan.aspx", "https://www.protean-tinpan.com/"],
  },
  "aadhaar-form": {
    fieldNames: ["Full Name", "Gender", "Date of Birth", "Address", "Mobile Number", "Email ID", "Biometrics"],
    originalTerms: ["Enrolment Agency", "Registrar", "Biometric Data"],
    simplifiedExplanations: [
      "The company authorized to collect your data.",
      "The government body overseeing the enrolment agency.",
      "Your fingerprints and iris scans.",
    ],
    requiredActions: ["Fill personal details", "Provide mobile number for updates", "Visit enrolment center", "Provide fingerprints and iris scan"],
    verifiedResources: ["https://uidai.gov.in/", "https://myaadhaar.uidai.gov.in/"],
  },
    "passport-form": {
    fieldNames: ["Applicant's Name", "Date of Birth", "Place of Birth", "Permanent Address", "Police Station", "Emergency Contact"],
    originalTerms: ["Emoluments", "ECR / ECNR", "Issuing Authority"],
    simplifiedExplanations: [
      "Your salary or income.",
      "'Emigration Check Required' status, for those who haven't passed 10th grade.",
      "The office that will issue your passport.",
    ],
    requiredActions: ["Fill all sections", "Attach birth certificate", "Attach proof of address", "Pay application fee", "Schedule appointment for police verification"],
    verifiedResources: ["https://www.passportindia.gov.in/"],
  }
};
