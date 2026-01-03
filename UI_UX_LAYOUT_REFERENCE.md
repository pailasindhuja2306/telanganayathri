# Web UI/UX Layout Reference

## Full Page Structure & Scroll Flow

```
┌─────────────────────────────────────────────────┐
│  STATUS BAR (Time, Signal, Battery, etc)        │
├─────────────────────────────────────────────────┤
│  SAFE AREA (SafeAreaView)                       │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │ YOUR SAFETY MATTERS | SOS BUTTON          │  │  ← Header (Fixed at top)
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ╔═════════════════════════════════════════╗   │
│  ║  SCROLLABLE CONTENT (ScrollView)        ║   │
│  ║                                          ║   │
│  ║  ┌─────────────────────────────────────┐ ║   │
│  ║  │  OUR SERVICES (TELANGANA)           │ ║   │  ← Section 1
│  ║  │  City default: Hyderabad · TS only  │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ┌──────────┐  ┌──────────┐        │ ║   │
│  ║  │  │ Ride Now │  │She-Yatri │        │ ║   │
│  ║  │  │ Hyderabad│  │women-only│        │ ║   │
│  ║  │  │lo instant│  │Safe      │        │ ║   │
│  ║  │  └──────────┘  └──────────┘        │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ┌──────────┐  ┌──────────┐        │ ║   │
│  ║  │  │   Tour   │  │  Book    │        │ ║   │
│  ║  │  │Hyderabad │  │ Driver   │        │ ║   │
│  ║  │  │Old City  │  │Hyd by hr │        │ ║   │
│  ║  │  └──────────┘  └──────────┘        │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ┌──────────┐  ┌──────────┐        │ ║   │
│  ║  │  │Intercity │  │ Parcel   │        │ ║   │
│  ║  │  │(from TS) │  │TS only   │        │ ║   │
│  ║  │  │Start in  │  │Hyderabad │        │ ║   │
│  ║  │  │Telangana │  │same-day  │        │ ║   │
│  ║  │  └──────────┘  └──────────┘        │ ║   │
│  ║  └─────────────────────────────────────┘ ║   │
│  ║                                          ║   │
│  ║  ┌─────────────────────────────────────┐ ║   │
│  ║  │  TOUR HYDERABAD                     │ ║   │  ← Section 2
│  ║  │  Hyperlocal curation · Telugu...    │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  📍 Old City Heritage                │ ║   │
│  ║  │     Charminar, Chowmahalla...        │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  📍 Golconda Sunset                  │ ║   │
│  ║  │     Golconda Fort, Tombs...          │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  📍 Night Drive Hyd                  │ ║   │
│  ║  │     Necklace Rd, Tank Bund...        │ ║   │
│  ║  └─────────────────────────────────────┘ ║   │
│  ║                                          ║   │
│  ║  ┌─────────────────────────────────────┐ ║   │
│  ║  │  AIRPORT & METRO                    │ ║   │  ← Section 3
│  ║  │  RGIA + TSRTC Pushpak...            │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ✈️  RGIA Airport Pickup             │ ║   │
│  ║  │     Fixed fare · She-Yatri...        │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  🚌 Pushpak Airport Bus              │ ║   │
│  ║  │     TSRTC Volvo timings...           │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  🚆 Metro Feeder                     │ ║   │
│  ║  │     Hitec, Raidurg, Secunderabad...  │ ║   │
│  ║  └─────────────────────────────────────┘ ║   │
│  ║                                          ║   │
│  ║  ┌─────────────────────────────────────┐ ║   │
│  ║  │  PICK YOUR LOCATION (NEW)           │ ║   │  ← Section 4 (LOCATION PICKER)
│  ║  │  For accurate ride estimates        │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ┌─────────────────────────────────┐│ ║   │
│  ║  │  │      [MAP PLACEHOLDER]          ││ ║   │
│  ║  │  │                                  ││ ║   │
│  ║  │  │     📍 (centered pin)            ││ ║   │
│  ║  │  │                                  ││ ║   │
│  ║  │  │  Lat: 17.3850 | Lng: 78.4867   ││ ║   │
│  ║  │  └─────────────────────────────────┘│ ║   │
│  ║  │                                      │ ║   │
│  ║  │  📍 Hyderabad, India                │ ║   │
│  ║  │     Lat: 17.3850 | Lng: 78.4867    │ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ┌─────────────────────────────────┐│ ║   │
│  ║  │  │ ✓ CONFIRM LOCATION              ││ ║   │
│  ║  │  └─────────────────────────────────┘│ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ┌─────────────────────────────────┐│ ║   │
│  ║  │  │ ↻ UPDATE LOCATION               ││ ║   │
│  ║  │  └─────────────────────────────────┘│ ║   │
│  ║  │                                      │ ║   │
│  ║  │  ✓ Precise location detection      │ ║   │
│  ║  │  ✓ Your location is secure         │ ║   │
│  ║  │  ✓ Drag pin to adjust location     │ ║   │
│  ║  └─────────────────────────────────────┘ ║   │
│  ║                                          ║   │
│  ║  [BOTTOM PADDING - 48px]                 ║   │
│  ║                                          ║   │
│  ╚═════════════════════════════════════════╝   │
│                                                  │
└─────────────────────────────────────────────────┘
```

## Responsive Breakpoints

### Mobile (< 768px)
```
Width: Full screen - 32px padding (16px each side)
Layout:
- Single column services (2-column grid)
- Full-width buttons
- Map height: 50% of screen width (min 250px)
- Touch targets: 48px minimum height
```

### Tablet (768px - 1024px)
```
Width: 90% of screen (max 1180px)
Layout:
- Same 2-column grid maintained
- Improved spacing
- Map height: responsive
- Balanced button sizing
```

### Desktop (> 1024px)
```
Width: Max 1180px, centered
Layout:
- 2-column grid with optimal spacing
- Enhanced visual hierarchy
- Full map preview
- Comfortable button sizing
- Wide margins on sides
```

## Color Scheme

### Primary Colors
- **Primary Action:** #6366F1 (Indigo)
- **Success/Safe:** #10B981 (Green)
- **Error/Alert:** #EF4444 (Red)
- **Warning:** #F59E0B (Amber)

### Text Colors
- **Primary Text:** #1F2937 (Gray 800)
- **Secondary Text:** #6B7280 (Gray 500)
- **Light Text:** #FFFFFF (White)
- **Disabled:** #D1D5DB (Gray 300)

### Background Colors
- **Primary BG:** #FFFFFF (White)
- **Secondary BG:** #F9FAFB (Gray 50)
- **Section Highlight:** #F0F4FF (Light Blue)
- **Success Highlight:** #ECFDF5 (Light Green)

## Spacing System

```
xs  = 4px
sm  = 8px
md  = 12px
lg  = 16px
xl  = 24px
2xl = 32px
3xl = 48px
```

### Applied Spacing
- Section top margin: 2xl (32px)
- Section padding: xl (24px)
- Location section: 3xl top margin (48px)
- Card gap: md (12px)
- Button padding: md vertical, lg horizontal
- Bottom padding: 3xl (48px)

## Typography

### Hierarchy
1. **Page Title:** 24px, Bold, Primary Color
2. **Section Title:** 20px, Bold, Primary Text
3. **Section Subtitle:** 14px, Regular, Secondary Text
4. **Card Title:** 16px, Semibold, Primary Text
5. **Card Subtitle:** 12px, Regular, Secondary Text
6. **Button Text:** 16px, Semibold, White/Primary
7. **Info Text:** 13px, Regular, Secondary Text

## Component Spacing

### Services Grid
```
Services Container
├─ Title (20px, Bold)
├─ Subtitle (14px, Secondary)
├─ [12px gap]
├─ [Card Row 1]
│  ├─ Card (responsive width)
│  ├─ [12px gap]
│  └─ Card (responsive width)
├─ [12px gap]
├─ [Card Row 2]
│  ├─ Card (responsive width)
│  ├─ [12px gap]
│  └─ Card (responsive width)
└─ [32px gap to next section]
```

### Location Picker
```
Location Picker Container
├─ Header
│  ├─ Icon
│  ├─ Title (16px, Bold)
│  └─ Subtitle (14px, Secondary)
├─ [Border]
├─ Map Container [responsive height]
│  └─ Loading / Error / Map content
├─ Details Container
│  ├─ Location Info
│  │  ├─ Icon
│  │  ├─ Address
│  │  └─ Coordinates
│  ├─ [12px gap]
│  └─ Buttons
│     ├─ Confirm Button [full width]
│     ├─ [12px gap]
│     └─ Update Button [full width]
└─ Info Section [green tinted]
   ├─ Info Item 1
   ├─ Info Item 2
   └─ Info Item 3
```

## Scroll Behavior

### Smooth Scrolling
- ScrollView enabled with showsVerticalScrollIndicator={false}
- Scroll momentum enabled
- Deceleration rate: normal
- Bounces enabled on iOS

### Content Overflow
- No clipping at bottom
- Bottom padding ensures space after last content
- All interactive elements fully tappable
- No content cut off on any screen size

## Interaction States

### Buttons
- **Default:** Full color background, white text
- **Pressed:** 96% opacity, slight scale down (0.97)
- **Disabled:** 50% opacity, no interaction
- **Focus:** Outline visible for accessibility

### Cards
- **Default:** Subtle shadow, full opacity
- **Hover:** Slight scale up (1.02), enhanced shadow
- **Pressed:** Scale down (0.96), shadow reduced
- **Disabled:** Reduced opacity, no interaction

### Location Picker
- **Loading:** Spinner animation, disabled buttons
- **Error:** Red icon, retry button enabled
- **Success:** Full interactivity, all buttons active
- **Map Placeholder:** Touch zone ready for real map

## Accessibility Features

✓ Minimum 48px tap targets for buttons
✓ Color contrast ratios meet WCAG AA
✓ Clear focus indicators
✓ Descriptive button labels
✓ Loading states visible
✓ Error messages clear and actionable
✓ Touch-friendly spacing on mobile

## Visual Hierarchy

1. **Header** (Safety message) - Top, always visible
2. **Services Grid** - Primary content, large cards
3. **Location Picker** - Secondary call-to-action, prominent position
4. **Info Section** - Supplementary information

## Key Improvements

✅ **Full Page Scrollability** - No content cut-off
✅ **Location Picker Integration** - Clear, accessible placement
✅ **Responsive Design** - Works on all screen sizes
✅ **Visual Balance** - Consistent spacing and alignment
✅ **User Guidance** - Clear info badges and instructions
✅ **Touch-Friendly** - Large, easy-to-tap targets
✅ **Loading States** - Clear feedback to user
✅ **Error Handling** - Graceful error messages with retry
✅ **Accessibility** - Proper contrast, readable text sizes
✅ **Modern Design** - Clean, contemporary UI patterns
