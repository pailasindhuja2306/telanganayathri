# Location Picker Setup & Usage Guide

## Installation Requirements

### Dependencies (Already Included)
- `expo-location` - For location services
- `expo-linear-gradient` - For UI gradients
- `react-native` - Core framework

### Permissions Configuration

#### Android (`app.json`)
```json
{
  "plugins": [
    [
      "expo-location",
      {
        "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location"
      }
    ]
  ]
}
```

#### iOS (`app.json`)
```json
{
  "infoPlist": {
    "NSLocationWhenInUseUsageDescription": "Your location is needed to find nearby rides",
    "NSLocationAlwaysAndWhenInUseUsageDescription": "Your location helps us provide better ride estimates"
  }
}
```

## Component Usage

### Basic Implementation
```typescript
import { LocationPicker } from '../../components';

<LocationPicker 
  onLocationSelect={(location) => {
    console.log('Selected:', location);
    // location = { latitude, longitude, address }
  }}
  showMap={true}
/>
```

### Props Interface
```typescript
interface LocationPickerProps {
  onLocationSelect?: (location: LocationData) => void;
  showMap?: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}
```

## Current Implementation

### In HomeScreen
```typescript
const [selectedLocation, setSelectedLocation] = useState<any>(null);

<LocationPicker 
  onLocationSelect={(location) => {
    setSelectedLocation(location);
    console.log('Location selected:', location);
  }}
  showMap={true}
/>
```

## Features by Section

### 1. Header Section
- **Icon + Title:** "Pick Your Location"
- **Subtitle:** "For accurate ride estimates"
- **Styling:** Light blue background with primary color icon
- **Height:** Auto-adjust based on content

### 2. Map Container
- **Height:** Responsive (50% of screen width, min 250px)
- **States:**
  - **Loading:** Activity indicator with "Finding your location..." text
  - **Error:** Alert icon with retry button
  - **Success:** Map placeholder with red location pin at center
- **Coordinates Display:** Shows latitude & longitude below pin

### 3. Details Container
- **Location Info:**
  - Icon (styled background)
  - Address (primary text)
  - Coordinates (secondary text)
  
- **Action Buttons:**
  - Primary: "Confirm Location" (filled button, primary color)
  - Secondary: "Update Location" (outline button)
  - Both are full-width with proper spacing

### 4. Info Section
- **Three Info Items:**
  1. ✓ Precise location detection
  2. ✓ Your location is secure & private
  3. ✓ Drag pin to adjust location
- **Styling:** Green-tinted background with success icons

## Styling & Customization

### Theme Integration
```typescript
// All colors use theme variables
theme.colors.primary.main      // Main action color
theme.colors.success           // Success state color
theme.colors.error             // Error state color
theme.colors.text.primary      // Primary text
theme.colors.text.secondary    // Secondary text

// Spacing follows theme system
theme.spacing.lg / md / sm / xs

// Typography
theme.fontSizes.lg / base / sm / xs
theme.fontWeights.bold / semiBold / medium
```

### Custom Styling
To modify appearance, edit styles in LocationPicker.tsx:

```typescript
const styles = StyleSheet.create({
  container: { /* Main container */ },
  header: { /* Header section */ },
  mapContainer: { /* Map area */ },
  detailsContainer: { /* Location details */ },
  // ... more styles
});
```

## Location Handling

### Workflow
1. Component mounts → Request location permission
2. User grants permission → Fetch current position
3. Get coordinates → Attempt reverse geocoding
4. Success → Display address + coordinates
5. User action → Call onLocationSelect callback

### Error Handling
```typescript
// Permission denied
→ Show error message with retry button

// Location fetch failed
→ Display user-friendly error
→ Offer retry option

// Reverse geocoding failed
→ Fall back to coordinate display
→ Continue with confirmation
```

## Integration with Other Features

### With Ride Booking
```typescript
// In RideBookingScreen
const [pickupLocation, setPickupLocation] = useState<any>(null);

<LocationPicker 
  onLocationSelect={(location) => {
    setPickupLocation(location);
    // Pre-fill ride details with location
    handleRideRequest(location);
  }}
/>
```

### With Driver Matching
```typescript
// Use location for:
- Finding nearby drivers
- Calculating ride distance
- Estimating fare
- ETA computation
```

### With Analytics
```typescript
// Log location selections for:
- Popular pickup locations
- User behavior analysis
- Service area optimization
```

## Testing Guide

### Manual Testing Checklist

1. **Permission Flow**
   - [ ] App requests location permission on load
   - [ ] Permission dialog appears (first time)
   - [ ] Accepts permission → Location loads
   - [ ] Denies permission → Error shown
   - [ ] Revoked permission → Retry button works

2. **Location Loading**
   - [ ] Loading spinner shows
   - [ ] Address resolves within 2-3 seconds
   - [ ] Coordinates display correctly
   - [ ] Address appears in readable format

3. **User Interactions**
   - [ ] Confirm button triggers callback
   - [ ] Update button refreshes location
   - [ ] Retry button works on error
   - [ ] Buttons are easily tappable

4. **Responsive Testing**
   - [ ] Mobile portrait: Full width, responsive height
   - [ ] Mobile landscape: Proper button layout
   - [ ] Tablet: Centered with good padding
   - [ ] Desktop: Max-width container, balanced spacing

5. **Visual Testing**
   - [ ] No text overflow
   - [ ] Proper color contrast
   - [ ] Icons display correctly
   - [ ] Spacing is consistent
   - [ ] Loading state is clear

### Automated Testing (Future)
```typescript
// Example test structure
describe('LocationPicker', () => {
  it('should request permission on mount', () => {});
  it('should fetch location on permission grant', () => {});
  it('should handle reverse geocoding', () => {});
  it('should call onLocationSelect on confirm', () => {});
  it('should be responsive on different screen sizes', () => {});
});
```

## Performance Optimization

### Current Optimizations
- Memoized location components
- Efficient state management
- Minimal re-renders
- Async location fetching (non-blocking)

### Future Optimizations
- Location caching
- Debounced location updates
- Background location sync
- Selective rendering based on visibility

## Troubleshooting

### Location Not Loading
**Issue:** Permission dialog doesn't appear
**Solution:** 
- Check app.json permissions config
- Test on physical device (simulator may have issues)
- Clear app cache and rebuild

### Slow Reverse Geocoding
**Issue:** Address takes too long to resolve
**Solution:**
- Normal (can take 1-3 seconds)
- Component shows fallback coordinates meanwhile
- Users can proceed without address

### Map Not Displaying
**Issue:** Map placeholder not showing
**Solution:**
- Component uses placeholder (ready for map library)
- To integrate real map: Install expo-maps or use Mapbox
- Replace map placeholder View with actual Map component

### Permission Revoked
**Issue:** User revoked location permission after first use
**Solution:**
- Component detects this on permission request
- Shows error with "Retry" button
- User can re-enable permission in settings

## API Integration Points

### Ready for Integration
```typescript
// Once location is selected, send to backend:
POST /api/rides/estimate
{
  pickupLocation: {
    latitude: number,
    longitude: number,
    address: string
  }
}

// Or use for driver matching:
POST /api/drivers/nearby
{
  latitude: number,
  longitude: number,
  radius: 5  // km
}
```

## Security & Privacy Notes

✅ **Implemented**
- Location only requested when needed
- User consent required
- No background location tracking
- Local processing (no unnecessary server calls)

⚠️ **Recommendations**
- Encrypt location data in transit
- Implement location history retention policy
- Add user privacy notice
- Provide location data deletion option

## Future Map Integration

### To Add Real Map (Google Maps)
```typescript
import MapView, { Marker } from 'react-native-maps';

<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
>
  <Marker
    coordinate={{
      latitude: location.latitude,
      longitude: location.longitude,
    }}
    draggable
    onDragEnd={(e) => updateLocation(e.nativeEvent.coordinate)}
  />
</MapView>
```

### To Add Real Map (Mapbox)
```typescript
import MapboxGL from '@react-native-mapbox-gl/maps';

<MapboxGL.MapView>
  <MapboxGL.PointAnnotation
    id="userLocation"
    coordinate={[location.longitude, location.latitude]}
    draggable
    onDragEnd={(coord) => updateLocation(coord)}
  />
</MapboxGL.MapView>
```

## Support & Documentation

For issues or questions:
1. Check component props and interfaces
2. Review error messages and console logs
3. Test on physical device (not just simulator)
4. Check location permission in device settings
5. Rebuild app after any permission changes
