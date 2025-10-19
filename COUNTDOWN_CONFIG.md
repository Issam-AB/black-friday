# Black Friday Countdown Configuration

## 🕐 How to Set Your Black Friday End Date

The countdown timer uses `useMemo` to ensure consistency across all components. Update in **THREE** files:

### Files to Update:

1. **`components/ui/CountdownTimer.tsx`** (Lines 17-23)
2. **`components/ui/MobileCountdown.tsx`** (Lines 17-23)  
3. **`components/ui/UrgentBanner.tsx`** (Lines 10-16)

### Current Settings (FOR TESTING - 3 days from now):
```typescript
const blackFridayEnd = useMemo(() => {
  const now = new Date();
  const endDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days
  return endDate.getTime();
}, []);
```

### Change To Your Actual Date:
```typescript
const blackFridayEnd = useMemo(() => {
  // OPTION 1: Set a specific date
  return new Date("2025-11-29T23:59:59").getTime();
  
  // OPTION 2: For testing - X days from now
  // const now = new Date();
  // const endDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
  // return endDate.getTime();
}, []);
```

### Example Dates:
```typescript
// Black Friday 2025
return new Date("2025-11-28T23:59:59").getTime();

// Cyber Monday 2025
return new Date("2025-12-01T23:59:59").getTime();

// For testing - 2 hours from now
const now = new Date();
return new Date(now.getTime() + (2 * 60 * 60 * 1000)).getTime();
```

---

## 🎨 Countdown Features

### Desktop Countdown (in Navbar)
- **Position**: Right side of navbar, between categories and search
- **Display**: Days, Hours, Minutes, Seconds with animations
- **Colors**:
  - Normal (>12h left): Yellow/Red theme
  - Warning (<12h left): Orange background
  - Urgent (<3h left): Red background with pulse animation
- **Animation**: Seconds flip with GSAP scale effect

### Mobile Countdown
- **Position**: Below logo/search, compact format
- **Display**: Simplified format (Dj HH:MM:SS)
- **Responsive**: Shows on screens < 768px

### Urgent Banner
- **Visibility**: Only appears when < 12 hours remaining
- **Colors**:
  - Orange (12-3 hours left): "URGENT: Plus que X heures!"
  - Red (< 3 hours left): "DERNIÈRES HEURES!" with bounce animation
- **Animation**: Slides down from top with GSAP, pulse effect

---

## 🚀 Customization Tips

### Change Urgency Thresholds:

**Show urgent banner earlier:**
```typescript
// In UrgentBanner.tsx, change line ~25:
if (daysLeft === 0 && hoursLeft < 24 && difference > 0) { // Shows at 24h instead of 12h
```

**Change color thresholds:**
```typescript
// In CountdownTimer.tsx:
const isUrgent = timeLeft.days === 0 && timeLeft.hours < 6; // Red at 6h instead of 3h
const isWarning = timeLeft.days === 0 && timeLeft.hours < 24; // Orange at 24h instead of 12h
```

### Remove Animations:
If you want a simpler countdown without animations:
- Remove GSAP imports
- Remove `gsap.fromTo()` calls
- Keep the time calculation logic

---

## 📱 Responsive Behavior

- **Desktop (≥1024px)**: Full countdown in navbar
- **Tablet (768-1023px)**: Compact countdown below navbar
- **Mobile (<768px)**: Minimal countdown format

---

## 🎯 Best Practices for Black Friday

1. **Set realistic end times** - Match your actual sale period
2. **Test urgency states** - Set date to current time + 2 hours to test red state
3. **Consider time zones** - The date uses client's local time
4. **Update after expiration** - Change date or remove countdown after sale ends

---

## 🛠️ Quick Test

To test the countdown in different states:

```typescript
// Test RED urgent state (< 3 hours)
const blackFridayEnd = new Date(Date.now() + 2 * 60 * 60 * 1000).getTime(); // 2 hours from now

// Test ORANGE warning state (< 12 hours)
const blackFridayEnd = new Date(Date.now() + 10 * 60 * 60 * 1000).getTime(); // 10 hours from now

// Test NORMAL state
const blackFridayEnd = new Date(Date.now() + 48 * 60 * 60 * 1000).getTime(); // 2 days from now
```

