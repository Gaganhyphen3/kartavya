# Kartavya Design Specifications

## Color Palette

### Primary Colors
- **Civic Blue**: `#0077B6` - Primary brand color, headers, buttons
- **Emerald Green**: `#00B894` - Success states, accent color, CTAs
- **Sun Yellow**: `#FDCB2D` - Alerts, warnings, pending status
- **Urban Gray**: `#636E72` - Neutral text, secondary elements

### Supporting Colors
- **White**: `#FFFFFF` - Background, cards, text on dark
- **Civic Orange**: `#E17055` - Achievements, badges, notifications
- **Midnight Blue**: `#1E2A38` - Dark mode background
- **Sky Cyan**: `#74B9FF` - Map overlays, highlights
- **Soft Lime**: `#A3CB38` - Resolved status, validation

## Typography

### Font Family
- **Primary**: Poppins (Google Fonts)
- **Fallback**: Inter, system fonts

### Font Weights
- **Regular**: 400 - Body text, descriptions
- **Medium**: 500 - Subheadings, labels
- **SemiBold**: 600 - Section headers
- **Bold**: 700 - Main headings, emphasis

### Font Sizes
- **H1**: 32px - Main page titles
- **H2**: 24px - Section headers
- **H3**: 20px - Card titles
- **H4**: 18px - Subheadings
- **Body1**: 16px - Primary text
- **Body2**: 14px - Secondary text
- **Caption**: 12px - Labels, metadata

## Layout & Spacing

### Grid System
- **Container**: 16px horizontal padding
- **Cards**: 12px border radius
- **Buttons**: 12px border radius
- **Input Fields**: 8px border radius

### Spacing Scale
- **XS**: 4px - Tight spacing
- **SM**: 8px - Close elements
- **MD**: 16px - Standard spacing
- **LG**: 24px - Section spacing
- **XL**: 32px - Page margins
- **XXL**: 48px - Large sections

## Component Specifications

### Cards
- **Border Radius**: 12px
- **Shadow**: Subtle drop shadow (elevation 2-4)
- **Padding**: 16px internal padding
- **Margin**: 8px vertical, 16px horizontal

### Buttons
- **Primary**: Civic Blue background, white text
- **Secondary**: Emerald Green background, white text
- **Outline**: Border with primary color, transparent background
- **Height**: 48px minimum touch target
- **Border Radius**: 12px

### Input Fields
- **Height**: 48px minimum
- **Border**: 1px solid Urban Gray
- **Focus State**: Civic Blue border
- **Error State**: Red border with Sun Yellow background tint
- **Placeholder**: Urban Gray text

### Status Indicators
- **Pending**: Sun Yellow background
- **In Progress**: Civic Orange background
- **Resolved**: Soft Lime background
- **Rejected**: Red background

### Icons
- **Style**: Outline style (Feather/Lucide)
- **Size**: 16px (small), 20px (medium), 24px (large)
- **Color**: Matches text color or brand colors

## Screen Layouts

### Mobile-First Approach
- **Breakpoint**: 375px minimum width
- **Safe Areas**: Respect device safe areas
- **Navigation**: Bottom tab navigation
- **Scrolling**: Vertical scrolling with pull-to-refresh

### Card-Based Design
- **Feed Layout**: Instagram-style vertical feed
- **Grid Layout**: 2-column grid for categories/stats
- **List Layout**: Single column for detailed items

## Accessibility

### Color Contrast
- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Clear focus indicators

### Touch Targets
- **Minimum Size**: 44px x 44px
- **Spacing**: 8px minimum between targets
- **Feedback**: Visual feedback on touch

### Text Readability
- **Line Height**: 1.4-1.6 for body text
- **Paragraph Spacing**: 16px between paragraphs
- **Text Scaling**: Support system text scaling

## Animation & Transitions

### Micro-Interactions
- **Duration**: 200-300ms for quick transitions
- **Easing**: Ease-out for entrances, ease-in for exits
- **Loading States**: Skeleton screens or spinners

### Page Transitions
- **Navigation**: Slide transitions between screens
- **Modal**: Fade in/out with backdrop
- **Cards**: Subtle scale on press

## Dark Mode Support

### Color Adaptations
- **Background**: Midnight Blue (`#1E2A38`)
- **Surface**: Lighter blue (`#2A3A4A`)
- **Text**: White with reduced opacity
- **Borders**: Lighter gray with reduced opacity

### Implementation
- **System Preference**: Follow device setting
- **Manual Toggle**: User preference override
- **Consistency**: All components support both modes