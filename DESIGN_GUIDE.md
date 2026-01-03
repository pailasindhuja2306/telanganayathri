# 🎨 Telangana Yatri - Visual Design Guide

## 🎯 Brand Identity

### Primary Brand Color
```
Deep Green (#0F3D2E) - Telangana Heritage
- Represents growth, trust, and nature
- Used for primary actions, headers, and navigation
- Evokes safety and reliability
```

### Supporting Colors
```
Warm Yellow (#F4C430) - Energy & Optimism
- Secondary actions
- Highlights and accents
- Represents sunshine and warmth

EV Green (#3DDC84) - Sustainability
- Eco-friendly rides
- Environmental consciousness
- Modern and fresh

Soft Purple (#8B5CF6) - Women Empowerment
- She-Yatri branding
- Safety and care
- Feminine and strong
```

## 🏗️ Layout Principles

### Screen Anatomy
```
┌─────────────────────────┐
│   Safety Bar (SOS)      │ ← Always visible, red accent
├─────────────────────────┤
│   Header / Title        │ ← 48px height, bold text
├─────────────────────────┤
│                         │
│   Main Content Area     │ ← Scrollable, cards, spacing
│   (Scrollable)          │
│                         │
├─────────────────────────┤
│   Bottom Navigation     │ ← 60px height, 4 tabs
└─────────────────────────┘
```

### Card Design
```
┌───────────────────────────┐
│  ┌─────┐                  │
│  │ICON │  Service Title   │ ← 16px padding all around
│  └─────┘  Subtitle text   │ ← 12px border radius
│                           │ ← Soft shadow (elevation 2-3)
│  [Badge]                  │
└───────────────────────────┘
```

## 📐 Spacing System (4px Grid)

```
xs:    4px  ▪
sm:    8px  ▪▪
md:   12px  ▪▪▪
base: 16px  ▪▪▪▪       ← Most common
lg:   20px  ▪▪▪▪▪
xl:   24px  ▪▪▪▪▪▪
2xl:  32px  ▪▪▪▪▪▪▪▪
3xl:  40px  ▪▪▪▪▪▪▪▪▪▪
```

### Usage Examples
```
Card padding:        16px (base)
Section spacing:     24px (xl)
Title margin bottom: 8px  (sm)
Icon size:          24px (base)
Button height:      48px (base)
```

## 🔤 Typography Scale

### Headings
```
H1: 36px - Page Titles
H2: 30px - Section Headers
H3: 24px - Card Titles
H4: 20px - Subsections
H5: 18px - Small Headers
```

### Body Text
```
Large:  18px - Prominent text
Base:   16px - Default body ← Most used
Small:  14px - Secondary info
Caption: 12px - Labels, tags
```

### Font Weights
```
Regular:  400 - Body text
Medium:   500 - Subtle emphasis
SemiBold: 600 - UI elements, buttons
Bold:     700 - Headlines, strong emphasis
```

## 🎨 Color Usage Guide

### Service Color Coding
```
🚗 Ride Now:      Deep Green   (#0F3D2E)
👩 She-Yatri:     Soft Purple  (#8B5CF6)
🌱 EV Rides:      EV Green     (#3DDC84)
🕐 Driver:        Warm Orange  (#F59E0B)
🗺️  Tour:         Sky Blue     (#3B82F6)
🚛 Intercity:     Brown        (#8B5A00)
📦 Parcel:        Hot Pink     (#EC4899)
🚌 Bus:           Indigo       (#6366F1)
```

### Semantic Colors
```
✅ Success:  #10B981 - Confirmations, checkmarks
⚠️  Warning:  #F59E0B - Alerts, cautions
❌ Error:    #EF4444 - Errors, validation
ℹ️  Info:     #3B82F6 - Information, tips
```

## 🖼️ Component Patterns

### Primary Button
```
┌──────────────────┐
│  [BUTTON TEXT]   │ ← 48px height
└──────────────────┘   12px border radius
                      Deep Green background
                      White text, semibold
                      Soft shadow
```

### Service Card (Small)
```
┌─────────────┐
│   [ICON]    │ ← 56px icon container
│             │   Background: color + 15% opacity
│  Service    │   Icon: 32px
│  Subtitle   │   
└─────────────┘   140px min height
                 16px padding
                 20px border radius
```

### Service Card (Featured)
```
┌──────────────────────┐
│ BADGE  [Gradient]    │ ← Full gradient background
│                      │   White text
│    [BIG ICON]        │   Larger (Featured)
│                      │
│   Service Title      │
│   Subtitle text      │
└──────────────────────┘
```

### Driver Card
```
┌────────────────────────────┐
│ ┌──┐                       │
│ │📷│ Driver Name      ⭐4.9│ ← Photo 56px circle
│ └──┘ 1,247 trips          │   Rating with star
├────────────────────────────┤   Divider line
│ 🚗 Vehicle Model  TS09AB12│ ← Vehicle info
└────────────────────────────┘   Border radius 12px
```

### Input Field
```
┌────────────────────────────┐
│ [ICON] Enter text here     │ ← 48px height
└────────────────────────────┘   Border on focus: primary color
  Label above (12px)            Light background when inactive
  Error below (red, 12px)       Smooth transition
```

## 🎭 Animation Guidelines

### Card Press Animation
```
Scale: 1.0 → 0.96 → 1.0
Duration: 150ms
Easing: Spring (friction: 3)
```

### Page Transition
```
Slide from right (Android)
Modal from bottom (iOS)
Duration: 300ms
Opacity: 0 → 1
```

### Button Press
```
Opacity: 1.0 → 0.8
Scale: 1.0 → 0.98
Haptic feedback (optional)
```

## 📱 Screen Templates

### 1. List Screen Template
```
┌─────────────────────────┐
│ [← Back]  Title    [•]  │ ← Header 48px
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │   List Item       │  │ ← Cards with 12px gap
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │   List Item       │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

### 2. Detail Screen Template
```
┌─────────────────────────┐
│ [← Back]  Title         │
├─────────────────────────┤
│  [Hero Image/Banner]    │ ← 200px height
├─────────────────────────┤
│  Section Title          │
│  Content here...        │
│                         │
│  Another Section        │
│  More content...        │
├─────────────────────────┤
│  [Primary Action CTA]   │ ← Fixed footer
└─────────────────────────┘
```

### 3. Form Screen Template
```
┌─────────────────────────┐
│ [← Back]  Title         │
├─────────────────────────┤
│                         │
│  Label                  │
│  [Input Field]          │
│                         │
│  Label                  │
│  [Input Field]          │
│                         │
│  Label                  │
│  [Input Field]          │
├─────────────────────────┤
│  [Submit Button]        │ ← Fixed footer
└─────────────────────────┘
```

## 🎯 Icon Usage

### Icon Sizes
```
Small:    16px - In text, inline
Base:     24px - Default buttons, cards ← Most used
Large:    32px - Feature icons
X-Large:  48px - Hero sections
```

### Icon Style
```
- Use Ionicons (consistent across app)
- Outline style for inactive states
- Filled style for active states
- Match icon color to context
```

## 🌈 Gradient Usage

### Primary Gradient
```
From: Deep Green (#0F3D2E)
To:   Light Green (#1A5940)
Direction: Left to Right or Top to Bottom
```

### Women Mode Gradient
```
From: Soft Purple (#8B5CF6)
To:   Light Purple (#A78BFA)
Direction: Diagonal (bottom-left to top-right)
```

### Usage
```
- Hero banners
- Featured cards
- Call-to-action buttons
- Headers (women mode)
```

## 📏 Component Sizes

### Buttons
```
Small:  36px height, 14px text
Base:   48px height, 16px text ← Default
Large:  56px height, 18px text
```

### Cards
```
Small Service:  140px min height
Large Service:  160px min height
Driver Card:    Auto height (content-based)
```

### Touch Targets
```
Minimum: 44x44px (iOS HIG)
Recommended: 48x48px ← Our standard
Icons only: 56x56px for clarity
```

## 🎨 Dark Mode Ready

### Color Adaptations
```
Background:
  Light: #FFFFFF
  Dark:  #111827

Text:
  Light: #1F2937
  Dark:  #F9FAFB

Cards:
  Light: #FFFFFF
  Dark:  #1F2937
```

## ✅ Accessibility

### Text Contrast
```
All text: Minimum 4.5:1 ratio
Large text: Minimum 3:1 ratio
Primary on white: ✅ Passes
White on primary: ✅ Passes
```

### Touch Targets
```
Minimum: 48x48px
Spacing: 8px between targets
Clear visual feedback on press
```

### Text Sizing
```
Body text: Minimum 16px
Scale up: Support dynamic type
Line height: 1.5x for readability
```

## 🖌️ Visual Hierarchy

### Priority Levels
```
1. Primary Action (CTA) → Largest, colored, prominent
2. Secondary Info → Medium, neutral
3. Tertiary Details → Small, muted
```

### Example: Service Card
```
1. Icon → Largest, colored
2. Title → Bold, 16px
3. Subtitle → Regular, 14px, grey
```

## 📱 Responsive Design

### Breakpoints
```
Small:  < 375px (iPhone SE)
Base:   375-414px (Most phones)
Large:  > 414px (Plus/Max phones)
Tablet: > 768px
```

### Grid System
```
2 columns: Service cards
1 column: Detail views, forms
Auto: Safety features (2 per row)
```

---

## 🎨 Quick Reference

### Most Used Values
```
Padding:        16px
Border Radius:  12px
Card Shadow:    elevation 3
Icon Size:      24px
Button Height:  48px
Text Size:      16px
Gap:            12px
```

### Brand Colors (RGB)
```
Primary:   rgb(15, 61, 46)
Secondary: rgb(244, 196, 48)
EV:        rgb(61, 220, 132)
Women:     rgb(139, 92, 246)
```

---

**Consistency is key to great design! 🎨**
