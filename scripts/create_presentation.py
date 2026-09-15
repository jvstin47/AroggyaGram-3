import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# Palette definitions
BG_DARK = RGBColor(11, 20, 19)         # #0B1413
TEAL_DEEP = RGBColor(0, 84, 72)        # #005448
TEAL_MED = RGBColor(13, 59, 51)        # #0D3B33
CARD_BG = RGBColor(20, 33, 31)         # #14211F
CARD_BORDER = RGBColor(35, 55, 52)     # Subtle border
EMERALD = RGBColor(16, 185, 129)       # #10B981
EMERALD_LIGHT = RGBColor(52, 211, 153) # #34D399
CREAM = RGBColor(251, 250, 246)        # #FBFAF6
WHITE = RGBColor(255, 255, 255)
GRAY_TEXT = RGBColor(160, 175, 170)
GRAY_MUTED = RGBColor(120, 135, 130)
RED_ACCENT = RGBColor(239, 68, 68)     # #EF4444
RED_BG = RGBColor(45, 18, 18)
AMBER_ACCENT = RGBColor(245, 158, 11)  # #F59E0B
AMBER_BG = RGBColor(45, 30, 10)
PURPLE_ACCENT = RGBColor(168, 85, 247) # #A855F7
PURPLE_BG = RGBColor(35, 18, 48)
BLUE_ACCENT = RGBColor(59, 130, 246)   # #3B82F6
BLUE_BG = RGBColor(15, 32, 58)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

def set_slide_bg(slide, color=BG_DARK):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)
    else:
        card.line.fill.background()
    return card

def add_header(slide, category, title, category_color=EMERALD):
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.733), Inches(1.2))
    tf = txBox.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    p1 = tf.paragraphs[0]
    p1.text = category.upper()
    p1.font.bold = True
    p1.font.size = Pt(11)
    p1.font.color.rgb = category_color
    p1.space_after = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = title
    p2.font.bold = True
    p2.font.size = Pt(28)
    p2.font.color.rgb = WHITE

# -------------------------------------------------------------
# SLIDE 1: Title & Hook
# -------------------------------------------------------------
s1 = prs.slides.add_slide(blank_layout)
set_slide_bg(s1, TEAL_DEEP)

# Hero Center Card
hero = add_card(s1, 1.2, 0.9, 10.933, 5.7, bg_color=BG_DARK, border_color=EMERALD)
tf1 = hero.text_frame
tf1.word_wrap = True
tf1.margin_left = Inches(0.8)
tf1.margin_right = Inches(0.8)
tf1.margin_top = Inches(0.6)

p = tf1.paragraphs[0]
p.alignment = PP_ALIGN.CENTER
p.text = "NATIONAL LEVEL HACKATHON 2026  •  HEALTHCARE TRACK"
p.font.bold = True
p.font.size = Pt(12)
p.font.color.rgb = EMERALD
p.space_after = Pt(16)

p = tf1.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "AroggyaGram"
p.font.bold = True
p.font.size = Pt(56)
p.font.color.rgb = WHITE
p.space_after = Pt(8)

p = tf1.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "Rural India's AI-Powered Emergency Health Response Network"
p.font.bold = True
p.font.size = Pt(22)
p.font.color.rgb = EMERALD_LIGHT
p.space_after = Pt(20)

p = tf1.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "“When the nearest hospital is 40 km away and an ambulance takes 90 minutes —\nAroggyaGram responds in 40 seconds.”"
p.font.size = Pt(15)
p.font.color.rgb = CREAM
p.space_after = Pt(28)

# 4 Pills at bottom of hero
pills = [
    ("🤖 Gemini AI Triage", 1.8, 5.4, 2.2),
    ("🚨 Deterministic SOS", 4.3, 5.4, 2.3),
    ("🤝 Verified Volunteers", 6.9, 5.4, 2.4),
    ("💊 Med Adherence", 9.6, 5.4, 2.2)
]
for text, x, y, w in pills:
    pill = add_card(s1, x, y, w, 0.6, bg_color=TEAL_MED, border_color=EMERALD)
    ptf = pill.text_frame
    ptf.margin_left = ptf.margin_right = ptf.margin_top = ptf.margin_bottom = 0
    pp = ptf.paragraphs[0]
    pp.alignment = PP_ALIGN.CENTER
    pp.text = text
    pp.font.bold = True
    pp.font.size = Pt(12)
    pp.font.color.rgb = WHITE

# -------------------------------------------------------------
# SLIDE 2: The Problem / The Crisis
# -------------------------------------------------------------
s2 = prs.slides.add_slide(blank_layout)
set_slide_bg(s2, BG_DARK)
add_header(s2, "The Crisis", "Rural India's Healthcare Desert", RED_ACCENT)

# 3 Stat Cards
stat_data = [
    ("65%", "Rural Population", "Over 650M citizens reside in rural districts with access to <30% of critical healthcare infrastructure.", 0.8),
    ("90+ Mins", "Emergency Delay", "Average emergency ambulance response time across Tier-3 panchayats and hilly regions.", 4.8),
    ("1 : 10,000", "Doctor Deficit", "Severe practitioner deficit in rural community clinics compared to 1:1,000 urban density.", 8.8)
]
for num, subtitle, desc, x in stat_data:
    card = add_card(s2, x, 1.9, 3.733, 2.3, bg_color=RED_BG, border_color=RED_ACCENT)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = ctf.margin_top = ctf.margin_bottom = Inches(0.25)
    
    p = ctf.paragraphs[0]
    p.text = num
    p.font.bold = True
    p.font.size = Pt(36)
    p.font.color.rgb = RED_ACCENT
    p.space_after = Pt(2)
    
    p = ctf.add_paragraph()
    p.text = subtitle
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = WHITE
    p.space_after = Pt(4)
    
    p = ctf.add_paragraph()
    p.text = desc
    p.font.size = Pt(11)
    p.font.color.rgb = GRAY_TEXT

# Daily Reality Card below
reality = add_card(s2, 0.8, 4.5, 11.733, 2.3, bg_color=CARD_BG, border_color=CARD_BORDER)
rtf = reality.text_frame
rtf.word_wrap = True
rtf.margin_left = rtf.margin_right = rtf.margin_top = rtf.margin_bottom = Inches(0.3)

p = rtf.paragraphs[0]
p.text = "The Daily Ground Reality in Isolated Panchayats:"
p.font.bold = True
p.font.size = Pt(14)
p.font.color.rgb = WHITE
p.space_after = Pt(8)

points = [
    ("• Chronic Neglect: ", "Elderly diabetic patients miss insulin & BP doses because local pharmacies are 10-15 km away."),
    ("• ASHA Isolation: ", "Frontline health workers face complex clinical events without instant diagnostic or triage escalation."),
    ("• Unwitnessed Trauma: ", "Falls, acute chest pains, and domestic trauma go unreported for critical hours in remote homesteads."),
    ("• Linguistic Barriers: ", "Patients unable to effectively communicate symptom histories in standardized terminology.")
]
for title, text in points:
    p = rtf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11.5)
    run1.font.color.rgb = EMERALD
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11.5)
    run2.font.color.rgb = GRAY_TEXT
    p.space_after = Pt(3)

# -------------------------------------------------------------
# SLIDE 3: Solution (4 Critical Pillars)
# -------------------------------------------------------------
s3 = prs.slides.add_slide(blank_layout)
set_slide_bg(s3, BG_DARK)
add_header(s3, "The Solution", "AroggyaGram: One Unified Platform, Four Pillars", EMERALD)

pillars = [
    ("🤖  AI Clinical Triage (Ask Aroggya)",
     "• Powered by Google Gemini 2.5 Flash\n• Natural speech/text in Malayalam, Hindi, Tamil, Bengali & English\n• Evaluates symptoms into LOW, MEDIUM, HIGH, CRITICAL risks\n• Immediate first-aid and clinic referral protocols (zero delays)",
     0.8, 1.9, 5.7, 2.4, TEAL_MED, EMERALD),
    
    ("🚨  Deterministic Emergency SOS",
     "• Automatic keyword detection bypasses AI for immediate rescue\n• 1-Tap emergency dial directly to 9539141210\n• Instant GPS coordinate capture with reverse geo-tagging\n• Multi-recipient WhatsApp emergency alerts to designated family",
     6.8, 1.9, 5.7, 2.4, RED_BG, RED_ACCENT),
    
    ("🤝  Volunteer Task & Responder Network",
     "• Mobilizes verified local neighbors for high-impact care tasks\n• 100-Point algorithmic matching (distance, skills, rating, vehicle)\n• Interactive Leaflet map view for active and nearby assistance calls\n• Scoped neighbor tasks: prescription pickup, clinic transport, welfare checks",
     0.8, 4.6, 5.7, 2.3, BLUE_BG, BLUE_ACCENT),
    
    ("💊  Structured Medication Adherence",
     "• Eliminates paper schedules with smart digital prescription tracking\n• Structured dosage picker: tablets, syrups, strength & food relations\n• Native 24h clock selector + fast mealtime presets (Morning, Noon, Night)\n• Daily compliance score & proactive adherence guidance notifications",
     6.8, 4.6, 5.7, 2.3, PURPLE_BG, PURPLE_ACCENT)
]

for title, body, x, y, w, h, bg_c, bord_c in pillars:
    card = add_card(s3, x, y, w, h, bg_color=bg_c, border_color=bord_c)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = ctf.margin_top = ctf.margin_bottom = Inches(0.25)
    
    p = ctf.paragraphs[0]
    p.text = title
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = WHITE
    p.space_after = Pt(6)
    
    for line in body.split("\n"):
        p = ctf.add_paragraph()
        p.text = line
        p.font.size = Pt(11)
        p.font.color.rgb = CREAM
        p.space_after = Pt(2)

# -------------------------------------------------------------
# SLIDE 4: How It Works (Orchestration Flow)
# -------------------------------------------------------------
s4 = prs.slides.add_slide(blank_layout)
set_slide_bg(s4, BG_DARK)
add_header(s4, "Intelligent Orchestration", "From Distress Signal to Coordinated Real-World Action", EMERALD)

steps = [
    ("STEP 01", "Voice / Text Intake",
     "Citizen speaks in dialect or types raw symptoms.\nWeb Speech API captures voice stream;\nzero complex medical jargon required.",
     0.8, EMERALD),
    ("STEP 02", "AI Situation Engine",
     "Gemini triages distress severity.\nTrauma keywords trigger instant SOS;\nnon-acute needs convert into structured care cases.",
     3.8, AMBER_ACCENT),
    ("STEP 03", "Volunteer Match & Dispatch",
     "MatchingService scores nearby responders (0-100)\nbased on distance, verified skills, and transport.\nBest-matched neighbor receives task alert.",
     6.8, PURPLE_ACCENT),
    ("STEP 04", "Resolution & Health Record",
     "Task completed on ground with photo/status update.\nCase logged into Unified Health Timeline.\nPatient rates experience; feedback loops to AI.",
     9.8, BLUE_ACCENT)
]

for step_num, title, body, x, color in steps:
    card = add_card(s4, x, 1.9, 2.733, 4.9, bg_color=CARD_BG, border_color=color)
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
    p.font.size = Pt(16)
    p.font.color.rgb = WHITE
    p.space_after = Pt(12)
    
    for line in body.split("\n"):
        p = ctf.add_paragraph()
        p.text = line
        p.font.size = Pt(11.5)
        p.font.color.rgb = GRAY_TEXT
        p.space_after = Pt(4)

# -------------------------------------------------------------
# SLIDE 5: Technology & Safety Architecture
# -------------------------------------------------------------
s5 = prs.slides.add_slide(blank_layout)
set_slide_bg(s5, BG_DARK)
add_header(s5, "Technology & Architecture", "Gemini Intelligence with Deterministic Safety Guardrails", EMERALD)

# Left Card: AI & Safety
c_left = add_card(s5, 0.8, 1.9, 5.7, 5.0, bg_color=CARD_BG, border_color=EMERALD)
ltf = c_left.text_frame
ltf.word_wrap = True
ltf.margin_left = ltf.margin_right = ltf.margin_top = ltf.margin_bottom = Inches(0.3)

p = ltf.paragraphs[0]
p.text = "Clinical AI Capabilities & Safety Bounds"
p.font.bold = True
p.font.size = Pt(16)
p.font.color.rgb = EMERALD
p.space_after = Pt(10)

safety_points = [
    ("Multilingual NLP: ", "Gemini 2.5 Flash natively processes Malayalam, Hindi, Tamil, Bengali & English with clinical grounding."),
    ("Triage Classification: ", "Categorizes urgency into LOW, MEDIUM, HIGH, CRITICAL with recommended clinical escalation."),
    ("User-Configurable API Key: ", "Zero vendor lock-in; dedicated in-app screen to test, validate, and store custom Gemini API keys locally."),
    ("Deterministic Safety Bypass: ", "Acute symptoms (unconsciousness, cardiac pain, stroke signs) bypass AI to prevent dangerous latency."),
    ("Non-Clinical Volunteer Scoping: ", "Strict system guardrails ensure volunteers perform ONLY logistics and accompaniment, never medical procedures.")
]
for title, text in safety_points:
    p = ltf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = WHITE
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11)
    run2.font.color.rgb = GRAY_TEXT
    p.space_after = Pt(6)

# Right Card: Tech Stack Table
c_right = add_card(s5, 6.8, 1.9, 5.7, 5.0, bg_color=CARD_BG, border_color=BLUE_ACCENT)
rtf = c_right.text_frame
rtf.word_wrap = True
rtf.margin_left = rtf.margin_right = rtf.margin_top = rtf.margin_bottom = Inches(0.3)

p = rtf.paragraphs[0]
p.text = "Production Engineering Stack"
p.font.bold = True
p.font.size = Pt(16)
p.font.color.rgb = BLUE_ACCENT
p.space_after = Pt(10)

stack_items = [
    ("Core Framework: ", "React 18 + TypeScript + Vite (2,065 modules, 1.35s build)"),
    ("Design System: ", "Tailwind CSS with universal Dark/Light mode tokens"),
    ("Intelligence: ", "Google Gemini 2.5 Flash SDK + Situation Synthesis Engine"),
    ("Geospatial: ", "Leaflet.js + OpenStreetMap for live volunteer dispatch"),
    ("Database & Auth: ", "Supabase (PostgreSQL with Row Level Security & real-time sync)"),
    ("App Packaging: ", "Capacitor Native Android APK + Installable Offline PWA"),
    ("Speech Synthesis: ", "Web Speech API (en-IN / ml-IN) with fallback transcript"),
    ("Test Coverage: ", "Vitest unit tests 100% passing across triage & state engines")
]
for comp, tech in stack_items:
    p = rtf.add_paragraph()
    run1 = p.add_run()
    run1.text = comp
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = WHITE
    run2 = p.add_run()
    run2.text = tech
    run2.font.size = Pt(11)
    run2.font.color.rgb = GRAY_TEXT
    p.space_after = Pt(6)

# -------------------------------------------------------------
# SLIDE 6: Volunteer Network & Emergency SOS
# -------------------------------------------------------------
s6 = prs.slides.add_slide(blank_layout)
set_slide_bg(s6, BG_DARK)
add_header(s6, "Community + Emergency Backbone", "Neighbors as First Responders, Tech as the Safety Net", AMBER_ACCENT)

# Left Card: Volunteer Network
v_card = add_card(s6, 0.8, 1.9, 7.2, 5.0, bg_color=TEAL_MED, border_color=EMERALD)
vtf = v_card.text_frame
vtf.word_wrap = True
vtf.margin_left = vtf.margin_right = vtf.margin_top = vtf.margin_bottom = Inches(0.3)

p = vtf.paragraphs[0]
p.text = "Verified Volunteer Network Architecture"
p.font.bold = True
p.font.size = Pt(16)
p.font.color.rgb = EMERALD_LIGHT
p.space_after = Pt(10)

v_points = [
    ("Configurable Service Radius: ", "Volunteers define manageable 1-15 km operating boundaries (default 8 km) around their home ward."),
    ("100-Point Match Algorithm: ", "Calculates composite score based on distance decay, registered skill sets (first aid, vehicle), and task ratings."),
    ("Dual View Operation: ", "One-tap toggle between real-time Leaflet Map markers and sortable urgency-first Task Lists."),
    ("Community Endorsement: ", "Onboarding requires ward-level verification to prevent impersonation and safeguard patient privacy."),
    ("Privacy Preserving: ", "Exact home addresses and medical records remain masked until volunteer accepts the task.")
]
for title, text in v_points:
    p = vtf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = WHITE
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11)
    run2.font.color.rgb = CREAM
    p.space_after = Pt(6)

# Right Card: SOS Emergency
sos_card = add_card(s6, 8.3, 1.9, 4.233, 5.0, bg_color=RED_BG, border_color=RED_ACCENT)
stf = sos_card.text_frame
stf.word_wrap = True
stf.margin_left = stf.margin_right = stf.margin_top = stf.margin_bottom = Inches(0.3)

p = stf.paragraphs[0]
p.text = "🚨 Emergency SOS Fail-Safe"
p.font.bold = True
p.font.size = Pt(16)
p.font.color.rgb = RED_ACCENT
p.space_after = Pt(10)

sos_points = [
    ("Direct Emergency Dial: ", "Hardcoded and wired to official emergency contact 9539141210."),
    ("GPS Coordinates: ", "Captures live latitude/longitude with high precision for ambulances."),
    ("Instant WhatsApp Blast: ", "Sends pre-formatted alert messages with location links to family."),
    ("Persistent Access: ", "Global high-contrast emergency button accessible from every single screen.")
]
for title, text in sos_points:
    p = stf.add_paragraph()
    run1 = p.add_run()
    run1.text = title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = WHITE
    run2 = p.add_run()
    run2.text = text
    run2.font.size = Pt(11)
    run2.font.color.rgb = CREAM
    p.space_after = Pt(6)

# -------------------------------------------------------------
# SLIDE 7: Impact, Pilot & Scalability
# -------------------------------------------------------------
s7 = prs.slides.add_slide(blank_layout)
set_slide_bg(s7, BG_DARK)
add_header(s7, "Traction & Deployment", "Built for Scale, Designed for Rural Dignity", EMERALD)

# 3 Top KPI Cards
kpi_data = [
    ("5 Languages", "Native Indian Dialects", "Malayalam, Hindi, Tamil, Bengali & English supported at launch.", 0.8),
    ("< 5 Seconds", "AI Triage Latency", "End-to-end symptom ingestion to clinical risk categorization.", 4.8),
    ("₹0 Cloud Cost", "Zero Hosting Lock-in", "Direct client-side Gemini execution with optional user API keys.", 8.8)
]
for val, title, desc, x in kpi_data:
    card = add_card(s7, x, 1.9, 3.733, 1.6, bg_color=TEAL_MED, border_color=EMERALD)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = ctf.margin_top = ctf.margin_bottom = Inches(0.2)
    
    p = ctf.paragraphs[0]
    p.text = val
    p.font.bold = True
    p.font.size = Pt(24)
    p.font.color.rgb = EMERALD_LIGHT
    p.space_after = Pt(2)
    
    p = ctf.add_paragraph()
    p.text = title + "  •  " + desc
    p.font.size = Pt(10)
    p.font.color.rgb = CREAM

# Middle 2 Cards
ben_card = add_card(s7, 0.8, 3.7, 5.7, 1.9, bg_color=CARD_BG, border_color=CARD_BORDER)
btf = ben_card.text_frame
btf.word_wrap = True
btf.margin_left = btf.margin_right = btf.margin_top = btf.margin_bottom = Inches(0.2)
p = btf.paragraphs[0]
p.text = "Primary Beneficiaries:"
p.font.bold = True
p.font.size = Pt(13)
p.font.color.rgb = WHITE
p.space_after = Pt(4)
p = btf.add_paragraph()
p.text = "• 650M+ rural residents lacking immediate emergency care\n• 1M+ ASHA workers seeking clinical decision support tools\n• Overwhelmed PHC medical officers managing triage backlogs"
p.font.size = Pt(10.5)
p.font.color.rgb = GRAY_TEXT

scale_card = add_card(s7, 6.8, 3.7, 5.7, 1.9, bg_color=CARD_BG, border_color=CARD_BORDER)
stf = scale_card.text_frame
stf.word_wrap = True
stf.margin_left = stf.margin_right = stf.margin_top = stf.margin_bottom = Inches(0.2)
p = stf.paragraphs[0]
p.text = "Architecture Scalability:"
p.font.bold = True
p.font.size = Pt(13)
p.font.color.rgb = WHITE
p.space_after = Pt(4)
p = stf.add_paragraph()
p.text = "• Offline-first caching for intermittent 2G/3G connectivity\n• Ready for Ayushman Bharat Digital Mission (ABDM) integration\n• Replicable template deployable across any Indian state/district"
p.font.size = Pt(10.5)
p.font.color.rgb = GRAY_TEXT

# Bottom Pilot Highlight Banner
pilot = add_card(s7, 0.8, 5.8, 11.733, 1.2, bg_color=TEAL_DEEP, border_color=EMERALD)
ptf = pilot.text_frame
ptf.word_wrap = True
ptf.margin_left = ptf.margin_right = ptf.margin_top = ptf.margin_bottom = Inches(0.2)
p = ptf.paragraphs[0]
p.alignment = PP_ALIGN.CENTER
p.text = "📍 Pilot Deployment Target: Kanjirappally Block, Kottayam District, Kerala"
p.font.bold = True
p.font.size = Pt(14)
p.font.color.rgb = WHITE
p.space_after = Pt(2)
p = ptf.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "Target Demographics: 220,000 population  |  4 Primary Health Centres  |  12 Sub-centres  |  180 ASHA Workers"
p.font.size = Pt(11)
p.font.color.rgb = EMERALD_LIGHT

# -------------------------------------------------------------
# SLIDE 8: The Ask & Vision
# -------------------------------------------------------------
s8 = prs.slides.add_slide(blank_layout)
set_slide_bg(s8, TEAL_DEEP)

hero8 = add_card(s8, 1.2, 0.7, 10.933, 6.1, bg_color=BG_DARK, border_color=EMERALD)
tf8 = hero8.text_frame
tf8.word_wrap = True
tf8.margin_left = tf8.margin_right = Inches(0.8)
tf8.margin_top = Inches(0.4)

p = tf8.paragraphs[0]
p.alignment = PP_ALIGN.CENTER
p.text = "NATIONAL HACKATHON 2026  •  FINAL PITCH"
p.font.bold = True
p.font.size = Pt(12)
p.font.color.rgb = EMERALD
p.space_after = Pt(10)

p = tf8.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "“No Rural Citizen Should Face Illness Alone.”"
p.font.bold = True
p.font.size = Pt(36)
p.font.color.rgb = WHITE
p.space_after = Pt(8)

p = tf8.add_paragraph()
p.alignment = PP_ALIGN.CENTER
p.text = "AroggyaGram doesn't wait for physical infrastructure to catch up.\nIt bridges the 40-km healthcare desert using the phone in every villager's pocket."
p.font.size = Pt(14)
p.font.color.rgb = CREAM
p.space_after = Pt(24)

# 3 Call-out cards inside hero
c_data = [
    ("🏆  The Ask", "Seed partnership with National Health Mission (NHM) Kerala to pilot across 4 rural panchayats in Kottayam district.", 1.8),
    ("🔬  Immediate Next Steps", "ASHA worker beta group onboarding, Supabase database synchronization, and local ABDM health registry linking.", 4.9),
    ("📲  Live & Functional Now", "Verified Android APK build available.\nComplete source code on GitHub:\ngithub.com/jvstin47/AroggyaGram-3", 8.0)
]
for title, desc, x in c_data:
    sub_card = add_card(s8, x, 4.0, 2.7, 2.3, bg_color=CARD_BG, border_color=CARD_BORDER)
    stf = sub_card.text_frame
    stf.word_wrap = True
    stf.margin_left = stf.margin_right = stf.margin_top = stf.margin_bottom = Inches(0.2)
    
    p = stf.paragraphs[0]
    p.text = title
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = EMERALD_LIGHT
    p.space_after = Pt(6)
    
    p = stf.add_paragraph()
    p.text = desc
    p.font.size = Pt(10.5)
    p.font.color.rgb = GRAY_TEXT

# Output file path
output_pptx = "/Users/justin/Public/projects/AroggyaGram 3/AroggyaGram_Pitch_Deck.pptx"
prs.save(output_pptx)
print(f"PPTX successfully generated at: {output_pptx}")
