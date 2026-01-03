# 🚕 TELANGANA YATRI – COMPREHENSIVE FEATURES SPECIFICATION

## 📋 PRODUCT OVERVIEW

**Telangana Yatri** is a Telangana-first mobility super-app designed to be:
- **Driver-friendly** with transparent pricing
- **Women-safe** with dedicated She-Yatri mode
- **Tourist-ready** with packaged tours
- **Logistics-enabled** for parcels and movers
- **Locally-focused** operating within Telangana
- **Interstate-capable** for travel originating from Telangana

---

## 👥 USER ROLES

### 👤 Riders / Customers
- Daily commuters
- Women riders (She-Yatri exclusive)
- Tourists visiting Telangana
- Families and groups
- Business travelers
- Event organizers (weddings, trips)

### 🚖 Drivers
- Bike / Auto / Cab drivers
- EV (Electric Vehicle) drivers
- Women drivers (She-Yatri certified)
- Hourly drivers (Driver-for-Hire packages)
- Tour guides

### 🚚 Logistics Partners
- Parcel delivery drivers
- Packers & movers
- Interstate transport operators

### 🧑‍💼 Admin (Backend)
- Safety monitoring team
- Pricing & zone management
- Verification & compliance
- Dispute resolution

---

## 🏗️ APP STRUCTURE

### A. AUTH & ONBOARDING
**Screens:**
1. **Splash Screen** - Brand intro with Telangana identity
2. **Mobile Login** - Phone number entry
3. **OTP Verification** - SMS verification
4. **Role Selection** - Choose User or Driver
5. **Profile Setup** - Name, photo, preferences
6. **Verification** - Aadhaar verification (UI flow)

**UX Principles:**
- Minimal steps
- Large, accessible buttons
- Clear progress indicators
- Trust-building language
- Telugu & Urdu support

---

## 🏠 HOME SCREEN (CORE EXPERIENCE)

### Service Tiles Grid (2 Columns)

#### LOCAL SERVICES (Telangana Only)

**1. Ride Now** 🚗
- Instant ride booking
- Bike, Auto, Cab options
- Real-time fare estimates
- Color: Deep Green (#0F3D2E)

**2. She-Yatri** 👩‍🦰
- Women-only safe rides
- Verified women drivers only
- Enhanced safety features
- Color: Soft Purple (#8B5CF6)
- Badge: "WOMEN ONLY"

**3. EV Rides** ⚡
- Eco-friendly electric vehicles
- Environmental impact tracking
- "You saved X kg CO₂" display
- Color: EV Green (#3DDC84)
- Badge: "GREEN"

**4. Book Driver (Hourly)** ⏱️
- 2hr, 4hr, 8hr, full-day packages
- Fixed pricing
- Use cases: Airport, weddings, elder care
- Color: Vibrant Orange (#FF6B35)

**5. Tour Packages** 🏛️
- Curated city tours
- Fixed-price packages
- Examples:
  - Hyderabad City Tour
  - Ramoji Film City
  - Charminar + Golconda Heritage
  - Hyderabad Night Drive
- Color: Warm Yellow (#F4C430)

**6. Bus / Bulk Transport** 🚌
- Group travel
- Marriage & event transport
- College & corporate trips
- Custom quotes
- Color: Deep Green (#0F3D2E)

#### INTERSTATE SERVICES (From Telangana)

**7. Intercity Share** 🔗
- BlaBla-style ride sharing
- Start: Telangana only
- End: Any state
- Share costs with co-travelers
- Badge: "INTERSTATE"
- Color: Blue (#3B82F6)

**8. Parcel & Logistics** 📦
- Small parcel delivery
- Bulk goods transport
- Packers & movers
- Interstate logistics
- Color: Brown (#8B5A00)

### Hyderabad Quick Picks
Horizontal scroll with 6 popular destinations:
1. **Hitech City** - Tech hub
2. **Gachibowli** - IT corridor
3. **Charminar** - Historic center
4. **Secunderabad** - Railway hub
5. **LB Nagar** - Residential area
6. **Airport (RGIA)** - International airport

### Safety Banner
Prominent purple gradient banner:
- "✓ Verified Drivers"
- "✓ 24×7 SOS"
- "✓ Women-Safe Rides"
- "✓ Live Tracking"

---

## 🚖 CORE FEATURE: RIDE BOOKING

### Pages Flow
1. **Pickup & Drop Selection** - Map-based pin placement
2. **Vehicle Category** - Bike / Auto / Cab / EV selection
3. **Fare Breakdown** - Transparent pricing display
4. **Driver Matching** - Finding nearby driver
5. **Ride Confirmation** - Driver details & vehicle info
6. **In-Ride Screen** - Live tracking with SOS button
7. **Ride Summary** - Payment & rating

### Key UX Elements
- Map-first design
- Always-visible SOS button (red, bottom-right)
- Share live location button
- Driver photo, name, rating
- Vehicle number & model
- Estimated time of arrival (ETA)

---

## 👩‍🦰 CORE FEATURE: SHE-YATRI (WOMEN-ONLY MODE)

### Rules
- ✓ Only women riders allowed
- ✓ Only verified women drivers
- ✓ Extra verification badges
- ✓ Enhanced safety protocols

### Unique Features
1. **Auto Live Share** - Location shared with emergency contacts
2. **In-Ride Recording** - Optional encrypted audio recording
3. **Women-Only Driver Pool** - 10K+ verified women drivers
4. **One-Tap SOS** - Instant alert to police & safety team
5. **Emergency Contacts** - Pre-configured trusted contacts

### UI Theme
- Primary color: Soft Purple (#8B5CF6)
- Calm, reassuring design
- Safety icons prominently displayed
- Warm, trust-building language

### Verification Process (UI)
- Aadhaar verification
- Selfie verification
- Phone number confirmation
- Emergency contact setup

---

## ⚡ CORE FEATURE: EV RIDES

### Environmental Impact
- Real-time CO₂ savings display
- "You saved X kg CO₂ today"
- Monthly/yearly impact summary
- Green badges & achievements

### UX Highlights
- Eco-friendly green accent color (#3DDC84)
- Leaf icons
- Environmental messaging
- Same booking flow as regular rides

---

## ⏱️ CORE FEATURE: BOOK DRIVER (HOURLY)

### Use Cases
- Airport pick-up/drop
- Wedding transportation
- Family outings
- Elder care transport
- Multi-stop errands

### Package Options
- **2 Hours** - ₹XXX
- **4 Hours** - ₹XXX
- **8 Hours** - ₹XXX
- **Full Day** - ₹XXX

### Pages
1. **Time Selector** - Choose duration
2. **Price Display** - Auto-calculated fixed price
3. **Driver Profile** - Preview assigned driver
4. **Booking Confirmation** - Start & extend options

---

## 🏛️ CORE FEATURE: TOUR PACKAGES (TY-Explore)

### Sample Packages

**1. Hyderabad City Tour** (₹XXX for 4 people)
- Charminar
- Golconda Fort
- Qutb Shahi Tombs
- Chowmahalla Palace
- Laad Bazaar

**2. Ramoji Film City** (Full Day - ₹XXX)
- Film city entry included
- Guided tour
- Lunch break
- Return transport

**3. Heritage Night Tour** (₹XXX)
- Tank Bund
- Necklace Road
- Lumbini Park
- NTR Gardens

### UX
- Fixed, transparent pricing
- Clean tourist-friendly cards
- Driver + vehicle included
- No hidden charges
- Advance booking option

---

## 🔗 CORE FEATURE: INTERCITY SHARE (BlaBla-Style)

### Rules
- **Start Location:** Must be in Telangana
- **End Location:** Any Indian state
- **Sharing:** Up to 4 passengers
- **Cost Split:** Automatically calculated

### Pages
1. **Trip List** - Browse available shared rides
2. **Trip Details** - Route, stops, cost per seat
3. **Seat Selection** - Choose number of seats
4. **Booking Confirmation** - Payment & contact exchange

### UX
- "INTERSTATE TRIP" badge
- Clear start/end locations
- Cost per seat display
- Driver rating & reviews
- Route map preview

---

## 📦 CORE FEATURE: LOGISTICS / PARCEL / MOVERS

### Service Types

**1. Small Parcel**
- Documents, packages
- Same-day delivery
- Size: Up to 5kg

**2. Bulk Goods**
- Furniture, appliances
- Commercial goods
- Size: Up to 500kg

**3. Packers & Movers**
- Home shifting
- Office relocation
- Full packing service

### Pages
1. **Parcel Size Selection** - Choose category
2. **Pickup & Delivery Details** - Addresses & time
3. **Quote Page** - Dynamic pricing
4. **Tracking Screen** - Real-time package location

### UX
- Professional, clean design
- Trust-oriented messaging
- Insurance information
- Proof of delivery

---

## 🚌 CORE FEATURE: BUS / BULK TRANSPORT

### Use Cases
- Wedding guest transport (Baraat)
- College/school trips
- Corporate events
- Religious pilgrimage groups
- Large family gatherings

### Vehicle Options
- 17-seater Tempo Traveller
- 32-seater Mini Bus
- 50-seater Bus

### Pages
1. **Event Type Selection** - Marriage / Corporate / Personal
2. **Vehicle Selection** - Choose bus size
3. **Route & Stops** - Multi-location support
4. **Custom Quote** - Request pricing

---

## 🛡️ GLOBAL SAFETY FEATURES

### Visible on ALL Ride Screens

**1. SOS Button**
- Position: Bottom-right, floating
- Color: Red (#EF4444)
- Size: 70x70px
- One-tap emergency alert

**2. Share Live Location**
- WhatsApp, SMS integration
- Real-time tracking link
- Auto-expires after ride

**3. Driver & Vehicle Details**
- Driver photo, name, rating
- Vehicle number, model, color
- Verification badges

**4. Ride Recording Indicator**
- Optional audio recording
- Encrypted & private
- Visible indicator when active

**5. 24×7 Support**
- In-app chat support
- Phone hotline
- Emergency response team

---

## 🚗 DRIVER APP - KEY PAGES

### Main Screens
1. **Driver Home** - Go Online/Offline toggle
2. **Ride Requests** - Accept/Reject incoming rides
3. **Earnings Dashboard** - Daily/weekly/monthly earnings
4. **Wallet & Withdrawals** - Cash out earnings
5. **Subscription Status** - Commission plans
6. **Ratings & Performance** - Driver score & feedback
7. **Trip History** - Past rides log

### UX Focus
- **Telugu Support** - Full language localization
- **Simple Earnings View** - Clear, no hidden fees
- **No Commission Confusion** - Transparent pricing model
- **Respectful Tone** - Driver-first messaging
- **Easy Navigation** - Large buttons, minimal clutter

---

## 🎨 UI/UX DESIGN SYSTEM

### Color Palette
```
Primary: Deep Green #0F3D2E (Telangana identity)
Secondary: Warm Yellow #F4C430 (Gold accent)
EV Green: #3DDC84
Women Mode: #8B5CF6 (Soft Purple)
Background: #FFFFFF, #F9FAFB, #F3F4F6
Text: #1F2937 (Charcoal Black)
Success: #10B981
Warning: #F59E0B
Error: #EF4444
```

### Typography
- **Font Family:** Modern sans-serif (System default)
- **Heading 1:** 24px, Bold
- **Heading 2:** 18px, Bold
- **Body:** 14-16px, Regular
- **Caption:** 12px, Regular
- **Telugu Support:** Noto Sans Telugu
- **Urdu Support:** Noto Nastaliq Urdu

### Design Principles
1. **Rounded Cards** - 12-20px border radius
2. **Soft Shadows** - Subtle elevation
3. **Large Tap Areas** - Minimum 44x44px
4. **Minimal Clutter** - Whitespace emphasis
5. **Trust-First Visuals** - Verification badges prominent
6. **Accessibility** - High contrast, readable fonts
7. **Responsive** - Works on all screen sizes

### Component Library
- **Buttons:** Primary, Secondary, Outline, Ghost, Women, EV
- **Cards:** Service, Feature, Info, Driver
- **Input Fields:** Text, Phone, OTP, Search
- **Safety Bar:** Global navigation with SOS
- **Service Tiles:** Interactive grid cards
- **Bottom Tabs:** Home, Bookings, Activity, Profile

---

## 📱 NAVIGATION STRUCTURE

### Main Tab Navigator (Bottom Tabs)
1. **Home** - Service tiles & quick actions
2. **Bookings** - Active & upcoming rides
3. **Activity** - Ride history & tracking
4. **Profile** - User settings & preferences

### Stack Navigators
- **Auth Stack:** Splash → Login → OTP → Role → Profile
- **Main Stack:** Home → Service Screens → Booking Flow
- **Women Stack:** She-Yatri intro → Verification → Booking
- **Driver Stack:** Driver Home → Earnings → Wallet

---

## 🌟 WHY THIS DESIGN WILL WORK

✅ **Telangana Identity** - Colors, language, local references
✅ **Hyderabad Relevance** - Quick picks, local landmarks
✅ **Women Trust & Safety** - Dedicated She-Yatri mode
✅ **Driver Loyalty** - Transparent pricing, no exploitation
✅ **Easy for All Users** - Rural & urban friendly
✅ **Government-Grade Professionalism** - Trust & reliability
✅ **Multi-Service Platform** - One app for all needs
✅ **Safety-First** - SOS, tracking, verification at core

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1 (MVP) ✓ COMPLETED
- ✅ Splash & Auth screens
- ✅ Home screen with service tiles
- ✅ She-Yatri (Women-only mode)
- ✅ Ride booking flow
- ✅ Safety features (SOS button)
- ✅ Design system setup

### Phase 2 (In Progress)
- 🔄 EV Rides feature
- 🔄 Driver booking (hourly packages)
- 🔄 Tour packages screen
- 🔄 Payment integration

### Phase 3 (Next)
- ⏳ Intercity share feature
- ⏳ Logistics & parcel delivery
- ⏳ Bus / bulk transport
- ⏳ Driver app

### Phase 4 (Future)
- ⏳ Live tracking maps
- ⏳ In-app chat
- ⏳ Rating & review system
- ⏳ Wallet & rewards

---

## 📞 CONTACT & SUPPORT

For feature questions or implementation details:
- Review DESIGN_GUIDE.md for visual specifications
- Check PROJECT_STRUCTURE.md for code organization
- See API_INTEGRATION.md for backend requirements

---

**Built with ❤️ for Telangana**
*Mana Telangana, Mana Yatri • తెలుగు & اردو Friendly*
