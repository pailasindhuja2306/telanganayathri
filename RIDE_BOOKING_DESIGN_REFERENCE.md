# 🎨 Ride Booking - Visual Design & UI Reference

**Last Updated:** December 23, 2025  
**Version:** 1.0

---

## 📐 Component Layouts

### LocationSelector Component
```
┌─────────────────────────────────────────┐
│  🟢 Pickup                         › ✏️  │  ← Touch to open modal
│     Choose pickup location               │
└─────────────────────────────────────────┘

Modal View:
┌─────────────────────────────────────────┐
│ ✕ | Select Pickup Location | - | ⋮     │ ← Header
├─────────────────────────────────────────┤
│ 🔍 [Search location...] | ✕             │ ← Search bar
├─────────────────────────────────────────┤
│ ✳️ Use Current Location                 │ ← Quick action
│    Auto-detect your position            │
├─────────────────────────────────────────┤
│ ⏱️ Recent Locations                      │ ← Section title
├─────────────────────────────────────────┤
│ 🏢 Office                               │ ← Location item
│    123 IT Park, Hitech City             │
├─────────────────────────────────────────┤
│ 🏠 Home                                 │
│    456 Jubilee Hills, Hyderabad         │
└─────────────────────────────────────────┘

States:
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ Empty          │  │ Selected       │  │ Loading        │
│ ─ Pickup       │  │ ✓ Pickup       │  │ ⟳ Fetching...  │
│ placeholder    │  │ 123 Hitech... │  │                │
└────────────────┘  └────────────────┘  └────────────────┘
```

---

### RideMapView Component
```
┌────────────────────────────────────────┐
│         Map View                        │
│                                        │
│  🟢 (Green Marker)                     │
│  Pickup Point                          │
│  123 Hitech City                       │
│       │                                │
│       │ Blue Line (Route)              │
│       │                                │
│      🔴 (Red Marker)                   │
│      Drop Point                        │
│      456 Jubilee Hills                 │
│                                        │
│    ✏️ Edit     ✏️ Edit                  │ ← Quick edit buttons
├────────────────────────────────────────┤
│ 📍 5.2 km | ⏱️ 18 min | 💰 ~₹180      │ ← Info bar
└────────────────────────────────────────┘

States:
┌──────────────────┐  ┌──────────────────┐
│ Empty            │  │ Pickup Only      │
│ Map View         │  │ Shows only       │
│ Select locations │  │ pickup marker    │
└──────────────────┘  └──────────────────┘

┌──────────────────┐  ┌──────────────────┐
│ Both Locations   │  │ Route Complete   │
│ Shows route      │  │ Full route with  │
│ between points   │  │ distance/time    │
└──────────────────┘  └──────────────────┘
```

---

### VehicleSelector Component
```
Horizontal Scrollable List:
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ [🚗]    │  │ [🚗] ✓  │  │ [🚗]    │  │ [🚗]    │
│ Bike    │  │ Auto ✓  │  │ Cab AC  │  │ Cab NL  │
│ 1 rider │  │ 3 seats │  │ 4 seats │  │ 4 seats │
│ 4 min   │  │ 5 min   │  │ 7 min   │  │ 7 min   │
│ ₹81     │  │ ₹102 ✓  │  │ ₹178    │  │ ₹140    │
│ Select  │  │ Selected│  │ Select  │  │ Select  │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
 ← Scroll →

Individual Vehicle Card (Selected):
┌──────────────────────────────┐
│                         ✓ ← Selection badge
│     [🚗]    ← Icon          │
│   Cab AC                    │
│                             │
│  👥 4 seats                 │
│  ⏱️ 7 min away              │
│                             │
│  ₹178                       │
│  [Selected]  ← Active state  │
└──────────────────────────────┘

Pricing Breakdown (When Selected):
┌──────────────────────────────┐
│ 📊 Cab AC - Details          │
├──────────────────────────────┤
│ Air-conditioned sedan for    │
│ comfort                      │
├──────────────────────────────┤
│ Distance        5.2 km       │
│ Base Fare       ₹100         │
│ Distance Charge ₹78          │
├──────────────────────────────┤
│ Total Fare      ₹178         │
└──────────────────────────────┘
```

---

## 🔢 Progress Indicator

### Visual Representation
```
Step 1: Initial (Pickup)
┌──────────────────────────────────┐
│ [1]————[ ]————[ ]                │
│  ✓Done  InProgress  Pending      │
└──────────────────────────────────┘

Step 2: Selecting Drop
┌──────────────────────────────────┐
│ [✓]————[2]————[ ]                │
│ Complete Done  Pending           │
└──────────────────────────────────┘

Step 3: Selecting Vehicle
┌──────────────────────────────────┐
│ [✓]————[✓]————[3]                │
│ Complete Complete Pending        │
└──────────────────────────────────┘

Step 4: Confirm
┌──────────────────────────────────┐
│ [✓]————[✓]————[✓]                │
│ Complete Complete Complete       │
└──────────────────────────────────┘
```

---

## 📱 Full Screen Layout

### Mobile (390px)
```
┌─────────────────────────┐
│ ← Book a Ride       ⋮   │ ← Header
├─────────────────────────┤
│ [1]─[·]─[·]             │ ← Progress
├─────────────────────────┤
│ 1️⃣ Select Locations    │ ← Section 1
│                         │
│ [🟢 Pickup >]           │
│ Choose pickup...        │
│                         │
│ [🔴 Drop]               │
│ Choose drop...          │
│                         │
│                         │
├─────────────────────────┤
│ [2️⃣ Route Overview]     │ ← Section 2 (scrolled)
│                         │
│ ┌──────────────────┐    │
│ │   Map View       │    │
│ │ 🟢 Pickup        │    │
│ │      │           │    │
│ │      │           │    │
│ │      🔴 Drop     │    │
│ └──────────────────┘    │
│                         │
│ 📍 5.2 km | ⏱️ 18 min   │
│                         │
├─────────────────────────┤
│ [3️⃣ Choose Vehicle]     │ ← Section 3 (scrolled)
│                         │
│ [🚗] [🚗 ✓] [🚗] ...   │
│ Bike Auto  Cab AC      │
│                         │
│ 📊 Auto - Details      │
│ ₹102                   │
│                         │
├─────────────────────────┤
│ [4️⃣ Driver Info]        │ ← Section 4 (scrolled)
│                         │
│ 👤 Rajesh Kumar        │
│ ⭐ 4.8 (1,247 trips)    │
│ 🚗 TS 09 AB 1234       │
│                         │
│ Fare Breakdown         │
│ Distance ₹78           │
│ Service ₹10            │
│ ─────────────          │
│ Total ₹88              │
│                         │
│ 🛡️ Safety Matters      │
│                         │
├─────────────────────────┤
│ Est. Fare: ₹88          │ ← Footer
│ [Confirm Booking]       │
└─────────────────────────┘
```

### Tablet (800px)
```
┌──────────────────────────────────┐
│ ← Book a Ride              ⋮      │
├──────────────────────────────────┤
│ [✓]────[·]────[·]                │
├──────────────────────────────────┤
│ 1️⃣ Select Locations              │
│                                  │
│ [🟢 Pickup >]  [🔴 Drop]          │
│                                  │
│ 2️⃣ Route Overview                │
│ ┌────────────────────────┐       │
│ │     Map View           │       │
│ │  🟢        🔴          │       │
│ │  ────────────          │       │
│ │ 5.2km | 18min | ₹~180  │       │
│ └────────────────────────┘       │
│                                  │
│ 3️⃣ Choose Vehicle                │
│ [🚗] [🚗✓] [🚗] [🚗] ...          │
│                                  │
│ 4️⃣ Driver & Confirm              │
│ 👤 Name | 📊 Pricing | 🛡️Safety   │
│                                  │
│ Est. Fare: ₹88  [Confirm]        │
└──────────────────────────────────┘
```

### Desktop (1200px)
```
┌────────────────────────────────────────────────┐
│ ← Book a Ride                            ⋮     │
├────────────────────────────────────────────────┤
│ [✓]──────[·]──────[·]                         │
├────────────────────────────────────────────────┤
│ 1️⃣ Select Locations                           │
│ [🟢 Pickup >] [🔴 Drop >]                     │
│                                               │
│ 2️⃣ Route Overview                             │
│ ┌──────────────────────────────┐              │
│ │        Map View              │              │
│ │   🟢       Route       🔴     │              │
│ │ 5.2km | 18min | Est. ₹180   │              │
│ └──────────────────────────────┘              │
│                                               │
│ 3️⃣ Choose Vehicle                             │
│ [🚗 Bike] [🚗 Auto✓] [🚗 Cab] [🚗 Premium]   │
│                                               │
│ 4️⃣ Driver Information                         │
│ 👤 Rajesh Kumar | ⭐4.8 | TS 09 AB 1234      │
│                                               │
│ Pricing: ₹78 + ₹10 = ₹88                      │
│                                               │
│ 🛡️ All drivers verified • 24/7 support        │
│                                               │
│ Est. Fare: ₹88    [Confirm Booking]          │
└────────────────────────────────────────────────┘
```

---

## 🎨 Color Palette Reference

### Primary Colors
```
Indigo (#6A5AE0) - Primary brand color
├─ Used for: Buttons, progress indicators, selections
├─ Contrast: White text ✓
└─ Usage: Main CTA, brand consistency

Success (#10B981) - Positive actions
├─ Used for: Pickup location, confirmations, badges
├─ Contrast: White text ✓
└─ Usage: Location markers, positive feedback

Error (#EF4444) - Alerts & warnings
├─ Used for: Drop location, error messages
├─ Contrast: White text ✓
└─ Usage: Location markers, warnings

Info (#3B82F6) - Information
├─ Used for: Route visualization, hints
├─ Contrast: White text ✓
└─ Usage: Route lines, information messages

Secondary (#FF8A4C) - Accents
├─ Used for: Highlights, secondary actions
├─ Contrast: White text ✓
└─ Usage: Accent elements, highlights
```

### Background Colors
```
White (#FFFFFF)
├─ Primary background
└─ Card backgrounds

Light Gray (#F9FAFB)
├─ Section backgrounds
└─ Subtle sections

Lighter Gray (#F3F4F6)
├─ Input backgrounds
└─ Tertiary elements

Dark Gray (#1F2937)
├─ Primary text
└─ Headings
```

---

## 📏 Spacing System

### Spacing Values
```
xs:  4px   ├─ Minimal spacing
sm:  8px   ├─ Small gaps
base: 12px ├─ Standard spacing
md: 12px   ├─ Medium spacing
lg: 16px   ├─ Large padding
xl: 24px   ├─ Extra large
2xl: 32px  ├─ Very large
3xl: 48px  └─ Maximum spacing
```

### Applied Examples
```
Section Margins:
├─ Section top:    3xl (48px)
├─ Section bottom: xl (24px)
├─ Card padding:   lg (16px)
└─ Text spacing:   md (12px)

Button Sizing:
├─ Touch target:   48px (minimum)
├─ Padding:        lg (16px)
└─ Height:         52px (recommended)

Input Fields:
├─ Height:         44px
├─ Padding:        md (12px)
└─ Border radius:  lg
```

---

## 🔤 Typography Scale

### Font Sizes
```
24px ← Headings (Bold)
20px ← Section titles (Bold)
16px ← Card titles (Semibold)
14px ← Body text (Regular)
13px ← Secondary text (Regular)
12px ← Helper text (Semibold)
```

### Font Weights
```
Bold (700)      ← Headings
Semibold (600)  ← Titles, labels
Regular (400)   ← Body text
```

### Text Hierarchy
```
Level 1: 24px Bold          ← Main heading
Level 2: 20px Bold          ← Section heading
Level 3: 16px Semibold      ← Card title
Level 4: 14px Regular       ← Body text
Level 5: 12px Semibold      ← Label
Level 6: 13px Secondary     ← Helper text
```

---

## 🎭 Component States

### LocationSelector States
```
┌──────────────┐
│ DEFAULT      │
│ 🟢 Pickup    │
│ placeholder  │
└──────────────┘

┌──────────────┐
│ FILLED       │
│ 🟢 Pickup    │
│ 123 Hitech.. │
│ ✏️ (editable)│
└──────────────┘

┌──────────────┐
│ LOADING      │
│ 🟢 Pickup    │
│ ⟳ Fetching.. │
└──────────────┘

┌──────────────┐
│ ERROR        │
│ 🟢 Pickup    │
│ ⚠️ Error     │
└──────────────┘

┌──────────────┐
│ DISABLED     │
│ 🔴 Drop      │
│ placeholder  │
│ (grayed out) │
└──────────────┘
```

### Vehicle Card States
```
UNSELECTED:
┌──────────────────┐
│ [🚗]             │
│ Bike             │
│ 1 rider | 4 min  │
│ ₹81              │
│ [Select]         │
└──────────────────┘

SELECTED:
┌──────────────────┐
│ [🚗] ✓           │
│ Bike             │
│ 1 rider | 4 min  │
│ ₹81              │
│ [Selected]       │ ← Active
└──────────────────┘

EXPANDED:
┌──────────────────┐
│ Bike - Details   │
├──────────────────┤
│ Budget option    │
│ for solo travel  │
├──────────────────┤
│ Dist: 5.2km      │
│ Base: ₹40        │
│ Charge: ₹41.60   │
│ Total: ₹81       │
└──────────────────┘
```

---

## 📊 Data Visualization

### Distance/Time/Fare Display
```
┌─────────────────────────┐
│ 📍 5.2 km               │
│ ⏱️ 18 min               │
│ 💰 ₹180 (approx)        │
└─────────────────────────┘

Calculation:
Distance = lat/lon calculation (Haversine)
Time = Distance × 3 min/km (average)
Fare = Base + (Distance × Price/km)
```

### Pricing Breakdown
```
┌──────────────────────────┐
│ Fare Details             │
├──────────────────────────┤
│ Distance Charge   ₹78    │
│ Service Fee       ₹10    │
├──────────────────────────┤
│ Total Fare        ₹88    │
└──────────────────────────┘

Formula:
Total = BasePrice + (Distance × PricePerKm) + ServiceFee
```

---

## 🎯 Interactive Elements

### Buttons
```
PRIMARY (Confirm)
┌──────────────────────┐
│ Confirm Booking      │ ← Full width, gradient
└──────────────────────┘
Colors: Indigo (primary)
Font: Bold, white
Height: 52px
Radius: md (8px)

SECONDARY (Select)
┌──────────────────┐
│ Select           │ ← Outlined, bordered
└──────────────────┘
Colors: Border indigo, text indigo
Height: 40px
Width: Fill parent

DISABLED
┌──────────────────────────┐
│ Choose a Vehicle         │ ← Grayed out
└──────────────────────────┘
Opacity: 0.5
Interaction: None
```

### Touch Targets
```
Minimum Size: 48px × 48px
Safe Padding: 8px between targets

LocationSelector:
├─ Entire field: 48px height ✓
└─ Icon: 40px × 40px ✓

VehicleCard:
├─ Select button: 40px height
├─ Card height: 180px ✓
└─ Touch area: Full card ✓

MapView:
├─ Edit buttons: 36px × 36px ✓
└─ Info bar: 44px height ✓
```

---

## 🎬 Animation & Transitions

### Page Transitions
```
Modal Open:
├─ Type: Slide up
├─ Duration: 300ms
├─ Easing: EaseOut
└─ Overlay: Fade in

Card Selection:
├─ Type: Scale
├─ Duration: 150ms
├─ From: 0.95 → 1.0
└─ Shadow: Light → Medium

Progress Update:
├─ Type: Fill animation
├─ Duration: 500ms
└─ Color transition: Light → Green
```

### Loading States
```
Spinning Indicator:
├─ Size: 24px
├─ Color: Primary (#6A5AE0)
├─ Duration: 1s per rotation
└─ Display: Centered

Skeleton Loaders:
├─ Show during: Location fetch, distance calc
├─ Color: Light gray
├─ Animation: Pulse (opacity)
└─ Duration: 1.5s cycle
```

---

## 📐 Responsive Behavior

### Layout Adaptation
```
< 768px (Mobile):
├─ Vehicle cards: Narrow width (160px)
├─ Map height: 280px
├─ Sections: Full width
└─ Stacked layout

768-1024px (Tablet):
├─ Vehicle cards: Medium width (180px)
├─ Map height: 320px
├─ Sections: Centered
└─ Balanced spacing

> 1024px (Desktop):
├─ Vehicle cards: Wider (200px+)
├─ Map height: 350px
├─ Sections: Max-width 1180px
└─ Generous margins
```

---

## ✅ Design Compliance

### WCAG AA Accessibility
```
Color Contrast:
├─ Text on background: 7:1 ✓ (AAA)
├─ Button text: 4.5:1 ✓ (AA)
└─ Icon on background: 3:1 ✓ (AA)

Touch Targets:
├─ Minimum: 48px × 48px ✓
├─ Spacing: 8px between ✓
└─ Interactive area: Clear ✓

Typography:
├─ Minimum size: 12px ✓
├─ Line height: 1.5× ✓
└─ Contrast: Sufficient ✓
```

---

## 🎨 Design System Integration

All design elements use centralized theme system:
```
theme.colors         → Color palette
theme.fontSizes      → Font sizes
theme.spacing        → Spacing scale
theme.borderRadius   → Border radius
theme.shadows        → Shadow effects
theme.fontWeights    → Font weights
```

This ensures consistency across the entire application.

---

## 📞 Design Documentation

**For More Details:**
- Colors: See `src/theme/colors.ts`
- Spacing: See `src/theme/spacing.ts`
- Typography: See `src/theme/typography.ts`
- Full Guide: See `MODERN_RIDE_BOOKING_GUIDE.md`

