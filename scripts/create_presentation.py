import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# App Signature Palette (Exact Theme Tokens)
BG_CANVAS = RGBColor(251, 250, 246)     # #FBFAF6 Warm Organic Cream Canvas
BRAND_TEAL = RGBColor(0, 84, 72)        # #005448 Deep Forest Teal (Primary)
BRAND_DARK = RGBColor(18, 30, 28)       # #121E1C Dark Slate Text
CARD_WHITE = RGBColor(255, 255, 255)    # #FFFFFF Clean Pure White
CARD_BORDER = RGBColor(232, 230, 223)   # #E8E6DF Soft Warm Border
TEXT_MUTED = RGBColor(87, 99, 97)       # #576361 Subtle Slate Body
MINT_BG = RGBColor(224, 242, 238)       # #E0F2EE Mint Pill Background
MINT_TEXT = RGBColor(0, 84, 72)         # #005448 Mint Accent Text
EMERALD_GREEN = RGBColor(46, 122, 91)   # #2E7A5B Success / Verification Green
WHITE = RGBColor(255, 255, 255)

# Semantic Category Colors
RED_SOS = RGBColor(214, 40, 40)         # #D62828 Emergency SOS
RED_LIGHT = RGBColor(254, 226, 226)     # #FEE2E2
AMBER_WARN = RGBColor(230, 138, 0)      # #E68A00 Triage / Warning
AMBER_LIGHT = RGBColor(254, 243, 199)   # #FEF3C7
PURPLE_MEDS = RGBColor(124, 58, 237)    # #7C3AED Prescription Tracking
PURPLE_LIGHT = RGBColor(237, 233, 254)  # #EDE9FE
BLUE_CLINIC = RGBColor(37, 99, 235)     # #2563EB Facilities & Maps
BLUE_LIGHT = RGBColor(219, 234, 254)    # #DBEAFE

LOGO_PATH = os.path.abspath("public/logo.jpg")

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

def set_slide_bg(slide, color=BG_CANVAS):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_card(slide, left, top, width, height, bg_color=CARD_WHITE, border_color=CARD_BORDER, border_width=1.2):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(border_width)
    else:
        card.line.fill.background()
    return card

def add_header(slide, category, title, category_color=BRAND_TEAL):
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.733), Inches(1.2))
    tf = txBox.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    p1 = tf.paragraphs[0]
    p1.text = category.upper()
    p1.font.bold = True
    p1.font.size = Pt(11)
    p1.font.color.rgb = category_color
    p1.space_after = Pt(3)
    
    p2 = tf.add_paragraph()
    p2.text = title
    p2.font.bold = True
    p2.font.size = Pt(26)
    p2.font.color.rgb = BRAND_DARK

# -------------------------------------------------------------
# SLIDE 1: Title & Hero (App Theme: Forest Teal Backdrop + Cream Card)
# -------------------------------------------------------------
s1 = prs.slides.add_slide(blank_layout)
set_slide_bg(s1, BRAND_TEAL)

# Hero Center Card
hero = add_card(s1, 1.2, 0.75, 10.933, 6.0, bg_color=BG_CANVAS, border_color=MINT_BG, border_width=2.5)
tf1 = hero.text_frame
tf1.word_wrap = True
tf1.margin_left = Inches(0.8)
tf1.margin_right = Inches(0.8)
tf1.margin_top = Inches(0.4)

if os.path.exists(LOGO_PATH):
    s1.shapes.add_picture(LOGO_PATH, Inches(6.066), Inches(1.05), Inches(1.2), Inches(1.2))

p = tf1.paragraphs[0]
p.alignment = PP_ALIGN.CENTER
p.text = "\n\n\nNATIONAL LEVEL HACKATHON 2026  •  HEALTHCARE & AI TRACK"
p.font.bold = True
p.font.size = Pt(11)
p.font.color.rgb = BRAND_TEAL
p.space_after = Pt(6)

p = tf1.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "AroggyaGram"
p.font.bold = True
p.font.size = Pt(50)
p.font.color.rgb = BRAND_DARK
p.space_after = Pt(4)

p = tf1.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "Intelligent Community Health-Response Network"
p.font.bold = True
p.font.size = Pt(20)
p.font.color.rgb = BRAND_TEAL
p.space_after = Pt(14)

p = tf1.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "“Turning unstructured human distress into coordinated real-world medical action in under 40 seconds.”"
p.font.size = Pt(14.5)
p.font.color.rgb = TEXT_MUTED
p.space_after = Pt(20)

# 4 Pills at bottom of hero
pills = [
    ("🤖 Multilingual Voice & AI Triage", 1.8, 5.7, 2.3),
    ("🚨 Deterministic 108 SOS", 4.35, 5.7, 2.2),
    ("🤝 Verified Volunteer Dispatch", 6.8, 5.7, 2.35),
    ("💊 Smart Prescription Adherence", 9.4, 5.7, 2.3)
]
for text, x, y, w in pills:
    pill = add_card(s1, x, y, w, 0.55, bg_color=CARD_WHITE, border_color=CARD_BORDER)
    ptf = pill.text_frame
    ptf.margin_left = ptf.margin_right = ptf.margin_top = ptf.margin_bottom = 0
    pp = ptf.paragraphs[0]
    pp.alignment = PP_ALIGN.CENTER
    pp.text = text
    pp.font.bold = True
    pp.font.size = Pt(10.5)
    pp.font.color.rgb = BRAND_TEAL

# -------------------------------------------------------------
# SLIDE 2: The Crisis (Rural Healthcare Desert)
# -------------------------------------------------------------
s2 = prs.slides.add_slide(blank_layout)
set_slide_bg(s2, BG_CANVAS)
add_header(s2, "The Crisis & Rural Reality", "The 40-Kilometer Healthcare Desert", RED_SOS)

stat_data = [
    ("65%", "Rural Population", "Over 650M Indian citizens reside in rural panchayats with access to <30% of emergency healthcare resources.", 0.8, RED_LIGHT, RED_SOS),
    ("90+ Mins", "Ambulance Lag", "Average emergency ambulance transit delay across Tier-3 panchayats, hilly roads, and remote settlements.", 4.8, AMBER_LIGHT, AMBER_WARN),
    ("1 : 10,000", "Practitioner Deficit", "Severe rural doctor-to-patient deficit in community clinics compared to WHO benchmark of 1:1,000.", 8.8, MINT_BG, BRAND_TEAL)
]
for num, subtitle, desc, x, bg_c, accent_c in stat_data:
    card = add_card(s2, x, 1.8, 3.733, 2.2, bg_color=CARD_WHITE, border_color=CARD_BORDER)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = ctf.margin_top = ctf.margin_bottom = Inches(0.25)
    
    p = ctf.paragraphs[0]
    p.text = num
    p.font.bold = True
    p.font.size = Pt(34)
    p.font.color.rgb = accent_c
    p.space_after = Pt(2)
    
    p = ctf.add_paragraph()
    p.text = subtitle
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = BRAND_DARK
    p.space_after = Pt(4)
    
    p = ctf.add_paragraph()
    p.text = desc
    p.font.size = Pt(10.5)
    p.font.color.rgb = TEXT_MUTED

reality = add_card(s2, 0.8, 4.3, 11.733, 2.7, bg_color=CARD_WHITE, border_color=CARD_BORDER)
rtf = reality.text_frame
rtf.word_wrap = True
rtf.margin_left = rtf.margin_right = rtf.margin_top = rtf.margin_bottom = Inches(0.3)

p = rtf.paragraphs[0]
p.text = "The Daily Ground Reality in Isolated Panchayats:"
p.font.bold = True
p.font.size = Pt(14)
p.font.color.rgb = BRAND_DARK
p.space_after = Pt(8)

points = [
    ("• Chronic Neglect: ", "Elderly diabetic patients miss insulin & BP doses because verified pharmacies are 10-15 km away."),
    ("• ASHA Isolation: ", "Frontline health workers face complex clinical events without real-time diagnostic or triage support."),
    ("• Unwitnessed Emergencies: ", "Falls, acute cardiac pain, and seasonal fevers go unreported for critical hours in remote households."),
    ("• Linguistic & Dialect Barriers: ", "Patients unable to effectively communicate symptom histories in standardized English terminology.")
]
for title, text in points:
    p = rtf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = BRAND_TEAL
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11)
    run2.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(3)

# -------------------------------------------------------------
# SLIDE 3: The Solution (4 Core Pillars)
# -------------------------------------------------------------
s3 = prs.slides.add_slide(blank_layout)
set_slide_bg(s3, BG_CANVAS)
add_header(s3, "The Platform Solution", "AroggyaGram: One Unified Platform, Four Architectural Pillars", BRAND_TEAL)

pillars = [
    ("🤖  Clinical AI Triage (Ask Aroggya)",
     "• Powered by Google Gemini 2.5 Flash + Clinical Safety Rules\n• Native voice-to-text in Malayalam, Hindi & English via Capacitor\n• Categorizes symptoms: LOW, MODERATE, HIGH, CRITICAL\n• Zero-overlap floating input card + automatic reading scroll",
     0.8, 1.8, 5.7, 2.5, MINT_BG, BRAND_TEAL),
    
    ("🚨  Deterministic Emergency SOS",
     "• Automatic red-flag detection bypasses AI for immediate rescue\n• 1-Tap emergency dial directly to 9539141210 / 108 Ambulance\n• High-precision GPS coordinates + reverse geo-tagged address\n• Caregiver dispatch notifications with live status tracking",
     6.8, 1.8, 5.7, 2.5, RED_LIGHT, RED_SOS),
    
    ("🤝  Volunteer Task & Responder Network",
     "• Mobilizes verified local neighbors for high-impact care tasks\n• 100-Point algorithmic matching (distance, skills, rating, vehicle)\n• Interactive geospatial map view for active community assistance\n• Scoped non-clinical tasks: medicine pickup, hospital escort",
     0.8, 4.6, 5.7, 2.4, BLUE_LIGHT, BLUE_CLINIC),
    
    ("💊  Structured Medication Adherence",
     "• Replaces forgotten paper prescriptions with digital schedules\n• Dosage tracker: tablets, syrups, strength & meal relations\n• Native 24h clock selector + fast mealtime presets (M/N/E)\n• Strict 10-digit phone verification & Supabase cloud sync",
     6.8, 4.6, 5.7, 2.4, PURPLE_LIGHT, PURPLE_MEDS)
]

for title, body, x, y, w, h, bg_c, bord_c in pillars:
    card = add_card(s3, x, y, w, h, bg_color=CARD_WHITE, border_color=CARD_BORDER)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = ctf.margin_top = ctf.margin_bottom = Inches(0.25)
    
    p = ctf.paragraphs[0]
    p.text = title
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = bord_c
    p.space_after = Pt(6)
    
    for line in body.split("\n"):
        p = ctf.add_paragraph()
        p.text = line
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(2)

# -------------------------------------------------------------
# SLIDE 4: Orchestration Flow (From Intake to Resolution)
# -------------------------------------------------------------
s4 = prs.slides.add_slide(blank_layout)
set_slide_bg(s4, BG_CANVAS)
add_header(s4, "Intelligent Orchestration", "From Colloquial Distress Signal to Coordinated Real-World Action", BRAND_TEAL)

steps = [
    ("STEP 01", "Native Voice / Dialect Intake",
     "Citizen speaks naturally or types symptoms.\nOffline-ready Android speech recognition captures transcript;\nzero medical terminology required.",
     0.8, BRAND_TEAL),
    ("STEP 02", "Situation & Safety Engine",
     "Clinical engine triages distress severity.\nTrauma keywords trigger instant SOS;\nnon-acute needs convert into structured Care Cases.",
     3.8, AMBER_WARN),
    ("STEP 03", "Volunteer Match & Dispatch",
     "MatchingService scores nearby responders (0-100)\nbased on distance, verified skills, and transport.\nBest-matched neighbor receives task alert.",
     6.8, PURPLE_MEDS),
    ("STEP 04", "Resolution & Audit Trail",
     "Task completed on ground with verification.\nCase logged into Unified Health Timeline.\nStrict patient privacy & encrypted cloud backup.",
     9.8, BLUE_CLINIC)
]

for step_num, title, body, x, color in steps:
    card = add_card(s4, x, 1.8, 2.733, 5.1, bg_color=CARD_WHITE, border_color=CARD_BORDER)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = ctf.margin_top = ctf.margin_bottom = Inches(0.3)
    
    p = ctf.paragraphs[0]
    p.text = step_num
    p.font.bold = True
    p.font.size = Pt(12)
    p.font.color.rgb = color
    p.space_after = Pt(4)
    
    p = ctf.add_paragraph()
    p.text = title
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = BRAND_DARK
    p.space_after = Pt(12)
    
    for line in body.split("\n"):
        p = ctf.add_paragraph()
        p.text = line
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(4)

# -------------------------------------------------------------
# SLIDE 5: Technology & Safety Architecture
# -------------------------------------------------------------
s5 = prs.slides.add_slide(blank_layout)
set_slide_bg(s5, BG_CANVAS)
add_header(s5, "Technology & Architecture", "Gemini Intelligence with Deterministic Safety Guardrails", BRAND_TEAL)

c_left = add_card(s5, 0.8, 1.8, 5.7, 5.1, bg_color=CARD_WHITE, border_color=CARD_BORDER)
ltf = c_left.text_frame
ltf.word_wrap = True
ltf.margin_left = ltf.margin_right = ltf.margin_top = ltf.margin_bottom = Inches(0.3)

p = ltf.paragraphs[0]
p.text = "Clinical AI Intelligence & Safety Guardrails"
p.font.bold = True
p.font.size = Pt(15)
p.font.color.rgb = BRAND_TEAL
p.space_after = Pt(10)

safety_points = [
    ("Multilingual NLP: ", "Gemini 2.5 Flash natively processes Malayalam, Hindi, and English with clinical grounding."),
    ("Triage Classification: ", "Categorizes urgency into LOW, MODERATE, HIGH, CRITICAL with recommended clinical escalation."),
    ("User-Configurable API Key: ", "Zero vendor lock-in; dedicated in-app screen to test, validate, and store custom Gemini keys locally."),
    ("Deterministic Safety Bypass: ", "Acute symptoms (unconsciousness, cardiac pain, stroke signs) bypass AI to prevent dangerous latency."),
    ("Non-Clinical Volunteer Scoping: ", "Strict guardrails ensure volunteers perform ONLY logistics and accompaniment, never medical procedures.")
]
for title, text in safety_points:
    p = ltf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = BRAND_DARK
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11)
    run2.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(5)

c_right = add_card(s5, 6.8, 1.8, 5.7, 5.1, bg_color=CARD_WHITE, border_color=CARD_BORDER)
rtf = c_right.text_frame
rtf.word_wrap = True
rtf.margin_left = rtf.margin_right = rtf.margin_top = rtf.margin_bottom = Inches(0.3)

p = rtf.paragraphs[0]
p.text = "Production Engineering Stack"
p.font.bold = True
p.font.size = Pt(15)
p.font.color.rgb = BLUE_CLINIC
p.space_after = Pt(10)

stack_items = [
    ("Core Framework: ", "React 19 + TypeScript + Vite (2,077 modules, ~1.3s build)"),
    ("Native Android Shell: ", "Capacitor 6 + Speech Recognition + Custom App Branding"),
    ("Intelligence: ", "Google Gemini 2.5 Flash SDK + Situation Synthesis Engine"),
    ("Geospatial: ", "Leaflet.js + OpenStreetMap for live volunteer dispatch"),
    ("Cloud Backend: ", "Supabase (PostgreSQL with RLS, public bulletins & clinic registry)"),
    ("Form Validation: ", "Strict 10-digit Indian phone validation + real-time counters"),
    ("Speech Recognition: ", "Native Android SpeechRecognizer + Web Speech API fallback"),
    ("Quality Assurance: ", "Vitest test suite passing across all triage and state machines")
]
for comp, tech in stack_items:
    p = rtf.add_paragraph()
    run1 = p.add_run()
    run1.text = comp
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = BRAND_DARK
    run2 = p.add_run()
    run2.text = tech
    run2.font.size = Pt(11)
    run2.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(5)

# -------------------------------------------------------------
# SLIDE 6: Field Deployment (Kanjirappally Case Study)
# -------------------------------------------------------------
s6 = prs.slides.add_slide(blank_layout)
set_slide_bg(s6, BG_CANVAS)
add_header(s6, "Field Deployment & Traction", "Real-World Grounding: Kanjirappally Block, Kottayam", BRAND_TEAL)

f_card = add_card(s6, 0.8, 1.8, 5.7, 5.1, bg_color=CARD_WHITE, border_color=CARD_BORDER)
ftf = f_card.text_frame
ftf.word_wrap = True
ftf.margin_left = ftf.margin_right = ftf.margin_top = ftf.margin_bottom = Inches(0.3)

p = ftf.paragraphs[0]
p.text = "Mapped Healthcare Ecosystem (Kanjirappally)"
p.font.bold = True
p.font.size = Pt(15)
p.font.color.rgb = BRAND_TEAL
p.space_after = Pt(10)

facilities = [
    ("MaryQueens Mission Hospital: ", "Multispecialty tertiary referral hospital with 24/7 emergency trauma care and ICU backup."),
    ("Kanjirappally General Hospital CHC: ", "Public community health centre providing free diagnostic testing, fever clinics & pharmacy refills."),
    ("Chirakkadavu Primary Health Centre: ", "Sub-block immunization clinic, ASHA hub, and maternal health monitoring center."),
    ("St. Dominic's 24/7 Pharmacy: ", "Emergency nocturnal medicine dispensary stocked with cardiovascular & diabetic medications.")
]
for title, text in facilities:
    p = ftf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = BRAND_DARK
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11)
    run2.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(6)

kpi1 = add_card(s6, 6.8, 1.8, 2.733, 2.4, bg_color=CARD_WHITE, border_color=CARD_BORDER)
ktf1 = kpi1.text_frame
ktf1.word_wrap = True
ktf1.margin_left = ktf1.margin_right = ktf1.margin_top = ktf1.margin_bottom = Inches(0.2)
p = ktf1.paragraphs[0]
p.text = "< 40 Secs"
p.font.bold = True
p.font.size = Pt(28)
p.font.color.rgb = EMERALD_GREEN
p = ktf1.add_paragraph()
p.text = "Rapid Care Dispatch"
p.font.bold = True
p.font.size = Pt(12)
p.font.color.rgb = BRAND_DARK
p = ktf1.add_paragraph()
p.text = "From voice distress to nearby verified responder notification."
p.font.size = Pt(10)
p.font.color.rgb = TEXT_MUTED

kpi2 = add_card(s6, 9.8, 1.8, 2.733, 2.4, bg_color=CARD_WHITE, border_color=CARD_BORDER)
ktf2 = kpi2.text_frame
ktf2.word_wrap = True
ktf2.margin_left = ktf2.margin_right = ktf2.margin_top = ktf2.margin_bottom = Inches(0.2)
p = ktf2.paragraphs[0]
p.text = "100%"
p.font.bold = True
p.font.size = Pt(28)
p.font.color.rgb = BRAND_TEAL
p = ktf2.add_paragraph()
p.text = "Offline Fallback"
p.font.bold = True
p.font.size = Pt(12)
p.font.color.rgb = BRAND_DARK
p = ktf2.add_paragraph()
p.text = "Zero downtime: cached clinical triage & local emergency contacts."
p.font.size = Pt(10)
p.font.color.rgb = TEXT_MUTED

impact_card = add_card(s6, 6.8, 4.5, 5.733, 2.4, bg_color=MINT_BG, border_color=BRAND_TEAL)
itf = impact_card.text_frame
itf.word_wrap = True
itf.margin_left = itf.margin_right = itf.margin_top = itf.margin_bottom = Inches(0.25)
p = itf.paragraphs[0]
p.text = "Empowering Frontline ASHA Workers"
p.font.bold = True
p.font.size = Pt(14)
p.font.color.rgb = BRAND_TEAL
p.space_after = Pt(4)
p = itf.add_paragraph()
p.text = "Instead of managing tedious paper registries, health workers use AroggyaGram for instant clinical triage, automated prescription compliance checks, and emergency escalation."
p.font.size = Pt(11)
p.font.color.rgb = BRAND_DARK

# -------------------------------------------------------------
# SLIDE 7: Live Product Readiness & Hardware Verification
# -------------------------------------------------------------
s7 = prs.slides.add_slide(blank_layout)
set_slide_bg(s7, BG_CANVAS)
add_header(s7, "Product Readiness & Hardware Audit", "Built, Tested, and Verified on Physical Android Hardware", BRAND_TEAL)

readiness = [
    ("📱 Native Android APK",
     "• Packaged with Capacitor 6\n• Tested on Redmi Note 14 5G (Android 14)\n• Official adaptive launcher icons\n• Direct ADB and browser install",
     0.8, BRAND_TEAL),
    ("🎙️ Native Voice-to-Text",
     "• Malayalam (ml-IN), Hindi (hi-IN), English\n• Android SpeechRecognizer integration\n• Works with one-tap mic button\n• Live transcription into chat & intake",
     4.8, EMERALD_GREEN),
    ("🛡️ Supabase & Data Sync",
     "• Live community health news bulletins\n• Verified Kanjirappally clinics & PHCs\n• Resilient offline caching\n• Strict 10-digit mobile number rules",
     8.8, BLUE_CLINIC)
]
for title, text, x, color in readiness:
    card = add_card(s7, x, 1.8, 3.733, 2.4, bg_color=CARD_WHITE, border_color=CARD_BORDER)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = ctf.margin_top = ctf.margin_bottom = Inches(0.25)
    
    p = ctf.paragraphs[0]
    p.text = title
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = color
    p.space_after = Pt(8)
    
    for line in text.split("\n"):
        p = ctf.add_paragraph()
        p.text = line
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(2)

metrics = add_card(s7, 0.8, 4.5, 11.733, 2.4, bg_color=CARD_WHITE, border_color=CARD_BORDER)
mtf = metrics.text_frame
mtf.word_wrap = True
mtf.margin_left = mtf.margin_right = mtf.margin_top = mtf.margin_bottom = Inches(0.3)

p = mtf.paragraphs[0]
p.text = "On-Device Performance Benchmarks (Redmi Note 14 5G):"
p.font.bold = True
p.font.size = Pt(13)
p.font.color.rgb = BRAND_DARK
p.space_after = Pt(6)

benchmarks = [
    ("• Cold App Launch: ", "Under 850 ms to full interactive home screen with zero blank frames."),
    ("• Voice Transcription Latency: ", "Sub-second speech-to-text response via on-device speech engine."),
    ("• Chat Layout Clearance: ", "Elevated input card floats cleanly above bottom navigation bar with zero occlusion."),
    ("• APK Footprint: ", "Ultra-lightweight ~4.1 MB distribution size, ideal for 2G/3G rural network downloads.")
]
for title, text in benchmarks:
    p = mtf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = BRAND_TEAL
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11)
    run2.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(2)

# -------------------------------------------------------------
# SLIDE 8: The Vision & Call to Action (Deep Teal Finish)
# -------------------------------------------------------------
s8 = prs.slides.add_slide(blank_layout)
set_slide_bg(s8, BRAND_TEAL)

hero8 = add_card(s8, 1.2, 0.75, 10.933, 6.0, bg_color=BG_CANVAS, border_color=MINT_BG, border_width=2.5)
tf8 = hero8.text_frame
tf8.word_wrap = True
tf8.margin_left = tf8.margin_right = Inches(0.8)
tf8.margin_top = Inches(0.4)

if os.path.exists(LOGO_PATH):
    s8.shapes.add_picture(LOGO_PATH, Inches(6.066), Inches(1.05), Inches(1.2), Inches(1.2))

p = tf8.paragraphs[0]
p.alignment = PP_ALIGN.CENTER
p.text = "\n\n\nNATIONAL LEVEL HACKATHON 2026  •  FINAL PITCH"
p.font.bold = True
p.font.size = Pt(11)
p.font.color.rgb = BRAND_TEAL
p.space_after = Pt(6)

p = tf8.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "“No Rural Citizen Should Face Illness Alone.”"
p.font.bold = True
p.font.size = Pt(32)
p.font.color.rgb = BRAND_DARK
p.space_after = Pt(6)

p = tf8.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "AroggyaGram doesn't wait for physical infrastructure to catch up.\nIt bridges the 40-km healthcare desert using the smartphone in every villager's pocket."
p.font.size = Pt(14)
p.font.color.rgb = TEXT_MUTED
p.space_after = Pt(18)

c_data = [
    ("🏆  The Ask", "Partnership with National Health Mission (NHM) Kerala to pilot across 4 rural panchayats in Kottayam district.", 1.8),
    ("🔬  Next Steps", "ASHA worker beta group onboarding, Supabase database sync, and ABDM health ID integration.", 4.9),
    ("📲  Live & Functional Now", "Verified Android APK build available.\nComplete source code on GitHub:\ngithub.com/jvstin47/AroggyaGram-3", 8.0)
]
for title, desc, x in c_data:
    sub_card = add_card(s8, x, 4.5, 2.7, 1.9, bg_color=CARD_WHITE, border_color=CARD_BORDER)
    stf = sub_card.text_frame
    stf.word_wrap = True
    stf.margin_left = stf.margin_right = stf.margin_top = stf.margin_bottom = Inches(0.2)
    
    p = stf.paragraphs[0]
    p.text = title
    p.font.bold = True
    p.font.size = Pt(12)
    p.font.color.rgb = BRAND_TEAL
    p.space_after = Pt(4)
    
    p = stf.add_paragraph()
    p.text = desc
    p.font.size = Pt(10)
    p.font.color.rgb = TEXT_MUTED

output_pptx = os.path.abspath("AroggyaGram_Pitch_Deck.pptx")
prs.save(output_pptx)
print(f"PPTX successfully generated at: {output_pptx}")
