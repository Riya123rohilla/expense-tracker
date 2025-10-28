# 🎨 Quick Visual Reference

## Color Palette

### Light Mode
- Background: `#f8fafc` (slate-50)
- Cards: `#ffffff` (white)
- Text: `#0f172a` (slate-900)
- Muted: `#64748b` (slate-500)

### Dark Mode
- Background: `#0b1220` (custom dark blue)
- Cards: `#071026` / slate-800
- Text: `#e6eef8` (light blue-gray)
- Muted: `#9aa9bf` (medium gray)

### Accent Colors
- Primary: Indigo-600 (`#4f46e5`)
- Secondary: Purple-600 (`#9333ea`)
- Success/Income: Green-600 (`#16a34a`)
- Danger/Expense: Rose-600 (`#e11d48`)
- Warning: Yellow-600 (`#ca8a04`)
- Info: Blue-600 (`#2563eb`)

## Emoji Reference

### Navigation & Actions
- 🏠 Home
- ➕ Add/Create
- 💳 Transactions/Payment
- 📊 Analytics/Charts
- 📄 Reports/Documents
- ⚙️ Settings/Config
- ✏️ Edit
- 🗑️ Delete
- 💾 Save
- 🔄 Reset/Refresh
- ✖️ Close/Cancel

### Financial
- 💰 Income/Money in
- 💸 Expense/Money out
- 💵 Balance/Total
- 💼 Business/Work
- 📈 Growth/Increase
- 📉 Decrease/Loss
- 🚨 Alert/Danger
- ⚠️ Warning/Caution

### UI Elements
- ☀️ Light mode
- 🌙 Dark mode
- 📥 Download/Export
- 🗓️ Calendar/Date
- ℹ️ Information
- ⚡ Quick/Fast
- 🥧 Pie chart
- 📋 List/Clipboard

## Component Styling Patterns

### Cards
```jsx
className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-card hover:shadow-xl transition-all"
```

### Buttons (Primary)
```jsx
className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
```

### Buttons (Secondary)
```jsx
className="px-6 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
```

### Input Fields
```jsx
className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
```

### Badges/Pills
```jsx
className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs"
```

### Table Rows
```jsx
className="border-b hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all"
```

## Animation Classes

- `.fade` - 250ms transition on all properties
- `.shadow-card` - Custom shadow with dark mode variant
- `.animate-slide-in` - Slide up + fade in animation
- `hover:-translate-y-1` - Lift effect on hover
- `transform` - Enable transform transitions

## Responsive Breakpoints

- `sm:` - 640px (tablets)
- `md:` - 768px (small laptops)
- `lg:` - 1024px (desktops)
- `xl:` - 1280px (large screens)

## Tips for Customization

1. **Change Primary Color**: Update indigo references to your preferred color
2. **Add More Emojis**: Use appropriate emojis for categories or custom features
3. **Adjust Gradients**: Modify `from-` and `to-` colors in gradient classes
4. **Custom Animations**: Add more keyframe animations in `index.css`
5. **Font**: Change font-family in `body` selector in `index.css`

---

This reference makes it easy to maintain consistent styling across the app! 🎨
