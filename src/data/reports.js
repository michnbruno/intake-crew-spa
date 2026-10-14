// Patient-facing summary content shown in the Report drawer once a run finishes.
// Stand-in until 9.2 wires this from real Summary agent output stored per run.
export const REPORTS = {
  deborah: {
    name: "Deborah A. Smith", line: "DOB 08/02/1984 (42) · Friday, October 2 at 9:00 AM · New patient",
    level: "ok", banner: "Ready for approval. No issues found.",
    visit: [["Reason", "Annual exam. Screens are hard to read by the end of the workday; eyes feel tired."], ["Wears", "Glasses"]],
    insurance: [["Vision plan", "ClearSight Vision, CSV-5820-1147-02"], ["Eligibility", "Eligible, exam copay $10"], ["Medical plan", "Contoso Health Plan, on file"]],
    docs: [["Portal pages 1–4", "Patient data and consents", "Signed 1 week ahead"], ["IMG_2201.jpg", "Vision insurance card", "98%"], ["IMG_2203.jpg", "Photo ID", "99%"], ["IMG_2210.jpg", "Photo of computer monitors", "88%"]],
    rx: null, rxNote: "No outside prescription submitted. Last exam 2019.",
    history: "None reported. Allergies: seasonal.",
    actions: [], doctorNote: "Patient reports screens are hard to read at work; photo of her monitor setup attached (page 7)."
  },
  harold: {
    name: "Harold J. Hanlon", line: "DOB 04/17/1958 (68) · Friday, October 2 at 9:30 AM · New patient",
    level: "warn", banner: "Ready, with 1 field to verify before the exam.",
    visit: [["Reason", "Annual exam. Reading small print is harder; wants new glasses."], ["Wears", "Glasses"]],
    insurance: [["Vision plan", "ClearSight Vision, CSV-4471-2290-18"], ["Eligibility", "Eligible, exam copay $10 (confirmed on second check)"], ["Medical plan", "Contoso Health Plan, on file"]],
    docs: [["Portal pages 1–4", "Patient data and consents", "Signed 8 days ahead"], ["IMG_4471.jpg", "Vision insurance card", "97%"], ["IMG_4473.jpg", "Photo ID", "98%"], ["lakeside_rx_scan.pdf", "Outside prescription, handwritten", "91%"]],
    rx: { source: "Lakeside Optical, Dr. M. Feld · written 3/11/23 · expired 3/11/24", rows: [["OD (right)", "-2.25", "-0.50", "090", "+2.00", true], ["OS (left)", "-2.00", "-0.75", "085", "+2.00", false]], pd: "63" },
    rxNote: "Reference only for the new exam (practice policy 4.2).",
    history: "High blood pressure, arthritis, dry eye. Family: glaucoma (mother). Medications: lisinopril, ibuprofen as needed.",
    actions: ["Confirm the right-eye sphere with the patient or Lakeside Optical. The scan reads -2.25 but could be -2.75 (page 7, 58% confidence).", "No action needed: the ID shows middle initial J, which the form left blank."],
    doctorNote: null
  }
};
