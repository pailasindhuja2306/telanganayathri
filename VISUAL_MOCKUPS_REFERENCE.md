# Visual Mockups & Screenshots Reference

## Screen 1: Header Section (Top)
```
┌─────────────────────────────────────┐
│  STATUS BAR                         │
├─────────────────────────────────────┤
│ 🛡️ Your safety matters    ✉️  | SOS  │ ← Header with safety message
├─────────────────────────────────────┤
│                                     │
│  [Purple Gradient Banner]           │ ← Quick action banner (full width)
│  "Book a Hyderabad ride"            │
│  "Telangana-only · Default: Hyd"    │
│                                     │
└─────────────────────────────────────┘
```

**Colors:**
- Icon: Green (#10B981)
- Text: Dark gray
- Button: Bright red (#EF4444)
- Banner: Gradient purple (#8B5CF6 → #7C3AED)

---

## Screen 2: Service Cards Section
```
┌─────────────────────────────────────┐
│  OUR SERVICES (TELANGANA)           │
│  City default: Hyderabad · TS only  │
│                                     │
│  ┌──────────────┐  ┌──────────────┐│
│  │🚗           │  │👩           ││ ← Card icons
│  │Ride Now      │  │She-Yatri     ││ ← Card titles
│  │Hyderabad lo  │  │Hyd women-only││ ← Card subtitles
│  │instant       │  │Safe      [SAFE]││ ← Badge on featured
│  └──────────────┘  └──────────────┘│
│                                     │
│  ┌──────────────┐  ┌──────────────┐│
│  │📍           │  │⏰           ││
│  │Tour          │  │Book Driver   ││
│  │Hyderabad     │  │Hyd by the hr ││
│  │Old City · GC │  │              ││
│  └──────────────┘  └──────────────┘│
│                                     │
│  ┌──────────────┐  ┌──────────────┐│
│  │✈️            │  │📦           ││
│  │Intercity     │  │Parcel (TS)   ││
│  │(from TS)     │  │only          ││
│  │Start in TG   │  │Hyderabad same││
│  └──────────────┘  └──────────────┘│
│                                     │
└─────────────────────────────────────┘
```

**Card Styles:**
- White background with shadow
- Rounded corners (20px)
- Icon in colored circle
- Title: Bold, dark
- Subtitle: Small, gray
- Featured card: Purple gradient background with white text
- Height: 240px

---

## Screen 3: Location Picker (Bottom - NEW)
```
┌─────────────────────────────────────┐
│ PICK YOUR LOCATION                  │ ← Header
│ For accurate ride estimates         │
├─────────────────────────────────────┤
│  ╔═════════════════════════════╗   │
│  ║   [MAP PLACEHOLDER]         ║   │
│  ║                             ║   │ ← Map area
│  ║   📍 (red pin at center)     ║   │ ← Location pin
│  ║   Lat: 17.3850              ║   │
│  ║   Lng: 78.4867              ║   │
│  ╚═════════════════════════════╝   │
│                                     │
│  📍 Hyderabad, India               │ ← Address display
│  Lat: 17.3850 | Lng: 78.4867      │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ ✓ CONFIRM LOCATION          │  │ ← Primary button
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ ↻ UPDATE LOCATION           │  │ ← Secondary button
│  └─────────────────────────────┘  │
│                                     │
│  ✓ Precise location detection      │
│  ✓ Your location is secure         │ ← Info section
│  ✓ Drag pin to adjust location     │
│                                     │
└─────────────────────────────────────┘
```

**Location Picker States:**

### Loading State
```
┌─────────────────────────────────────┐
│ PICK YOUR LOCATION                  │
│ For accurate ride estimates         │
├─────────────────────────────────────┤
│                                     │
│      ⊙ (spinner animation)          │
│                                     │
│  Finding your location...           │
│                                     │
└─────────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────────┐
│ PICK YOUR LOCATION                  │
│ For accurate ride estimates         │
├─────────────────────────────────────┤
│                                     │
│      ⚠️ (warning icon)              │
│                                     │
│  Permission to access location      │
│  was denied                         │
│                                     │
│  ┌─────────────────────────────┐  │
│  │      RETRY                  │  │
│  └─────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## Color Palette

### Primary Colors
```
🔵 Primary: #6366F1 (Indigo)
   Used for: Main buttons, icons, focus states

🟢 Success: #10B981 (Green)
   Used for: Safety badges, success states, info icons

🔴 Error: #EF4444 (Red)
   Used for: Error states, alert icons, warning messages

🟡 Warning: #F59E0B (Amber)
   Used for: Warning states, attention items
```

### Background Colors
```
⚪ Primary BG: #FFFFFF (White)
   Main background

⬜ Secondary BG: #F9FAFB (Light Gray)
   Cards, sections

🟦 Section Highlight: #F0F4FF (Light Blue)
   Header sections

🟩 Success Highlight: #ECFDF5 (Light Green)
   Info sections
```

### Text Colors
```
⬛ Primary: #1F2937 (Dark Gray)
   Main text

🔷 Secondary: #6B7280 (Medium Gray)
   Descriptions, subtitles

⚪ Light: #FFFFFF (White)
   Text on colored backgrounds
```

---

## Typography System

### Font Sizes
```
24px → Page titles (h1)
20px → Section titles (h2)
16px → Card titles, buttons (h3)
14px → Subtitles (h4)
13px → Regular text
12px → Small text
11px → Extra small (coordinates)
```

### Font Weights
```
700 → Bold (headings)
600 → Semibold (buttons, emphasized)
500 → Medium (secondary headings)
400 → Regular (body text)
```

### Line Heights
```
1.2x → Headings
1.25x → Subtitles
1.5x → Body text
```

---

## Spacing System

### Scale
```
4px  → Extra small (xs)
8px  → Small (sm)
12px → Medium (md)
16px → Large (lg)
24px → Extra large (xl)
32px → 2x large (2xl)
48px → 3x large (3xl)
```

### Applied Throughout
```
Section margins: 2xl (32px)
Section padding: xl (24px)
Location section: 3xl top (48px)
Card gaps: md (12px)
Button padding: md vertical, lg horizontal
Bottom padding: 3xl (48px)
```

---

## Component Spacing Details

### Service Card Spacing
```
Card: 16px padding inside
Icon size: 48x48px
Icon to title gap: 8px
Title to subtitle gap: 8px
Rows gap: 12px
Cards horizontal gap: 12px
```

### Location Picker Spacing
```
Header padding: 16px
Header elements gap: 12px
Map height: responsive (50% width, min 250px)
Content padding: 16px
Element gaps: 12px
Button height: 44px
Button padding: 12px vertical
Info items vertical gap: 12px
```

---

## Interactive States

### Button States
```
DEFAULT
┌──────────────────────────┐
│ ✓ CONFIRM LOCATION       │  ← Full color
└──────────────────────────┘

PRESSED
┌──────────────────────────┐
│ ✓ CONFIRM LOCATION       │  ← 96% opacity, slight scale
└──────────────────────────┘

DISABLED
┌──────────────────────────┐
│ ✓ CONFIRM LOCATION       │  ← 50% opacity, no interaction
└──────────────────────────┘
```

### Card States
```
DEFAULT
┌─────────────┐
│ Service     │  ← Subtle shadow
│ Card        │
└─────────────┘

HOVER (Desktop)
┌─────────────┐
│ Service     │  ← Enhanced shadow, scale 1.02
│ Card        │
└─────────────┘

PRESSED (Mobile)
┌─────────────┐
│ Service     │  ← Scale 0.96, reduced shadow
│ Card        │
└─────────────┘
```

---

## Responsive Examples

### Mobile (iPhone 12)
```
Width: 390px
Layout:
- Full-width cards with 16px margins
- 2-column grid: (390 - 32) / 2 = 179px per card
- Map height: 195px (50% of width)
- Single-column buttons
- Touch targets: 48px+
```

### Tablet (iPad)
```
Width: 768px
Layout:
- Centered max-width 1180px
- Cards wider with better spacing
- Map height: responsive
- Multi-touch optimized
```

### Desktop (1920px)
```
Width: 1920px
Layout:
- Centered max-width 1180px
- Generous side margins: (1920-1180)/2 = 370px
- Optimal card spacing
- Full-width map preview
- Comfortable button sizing
```

---

## Animations & Transitions

### Loading Spinner
```
⊙ → ◐ → ◑ → ◕ → ⊙ → ...
Continuous rotation, 1 second per cycle
Color: Primary (#6366F1)
```

### Button Press
```
Scale: 1.0 → 0.96 on press → 1.0 on release
Duration: 200ms
Easing: Spring with friction 3, tension 40
```

### Fade Transitions
```
Loading → Success: 300ms fade
Error → Retry: Instant
State changes: 200ms fade cross-dissolve
```

---

## Accessibility Indicators

### Focus States
```
Buttons: 2px outline in primary color
Cards: 2px outline on focus
Text fields: Blue underline on focus
All elements: High contrast focus indicator
```

### Color Blind Safe
```
✓ Icons used alongside colors
✓ Text labels for all states
✓ No color-only information
✓ Sufficient contrast ratios (4.5:1 minimum)
```

### Text Sizing
```
Minimum: 12px (with good contrast)
Default: 14-16px for body
Headings: 20px+
All text scales with system zoom
```

---

## Responsive Breakpoints

### Mobile First Approach
```
Mobile (max-width: 768px)
- Full width
- Large touch targets
- Single column layouts
- Simple navigation

Tablet (768px - 1024px)
- Centered content
- Optimized spacing
- 2-3 column layouts
- Balanced typography

Desktop (1024px+)
- Max-width container
- Generous margins
- Full features
- Enhanced visuals
```

---

## Summary

This visual reference provides:
- ✅ Complete UI mockups
- ✅ Color specifications (hex codes)
- ✅ Typography system
- ✅ Spacing measurements
- ✅ Component layouts
- ✅ Interactive states
- ✅ Responsive examples
- ✅ Accessibility features

Use this as a guide for implementation, quality assurance, and future design decisions.
