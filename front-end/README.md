# Save-A-Watt: Front-end

This is the React + TypeScript + Tailwind client for Save-A-Watt. For the architecture and full setup, see the [root README](../README.md).

```bash
npm install
npm start        # dev server on http://localhost:3000
npm run build    # production build in ./build
```

The app expects the Flask back-end at `http://localhost:5000`. That URL is set in `src/components/BillUpload.tsx` and `src/components/AnalysisResults.tsx`.
