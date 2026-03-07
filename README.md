# GeoCodeBench Website

A comprehensive evaluation platform for assessing Large Language Models' capabilities in 3D geometric computer vision programming tasks.

## Features

- 🏠 **Home**: Overview with statistics and key findings
- 📊 **Leaderboard**: Interactive rankings with multi-dimensional filtering
- 📈 **Analysis**: Visualizations including scatter plots, pie charts, and bar charts
- 📚 **Case Studies**: Detailed analysis of model behaviors and failure patterns
- 💾 **Download**: Access to datasets, evaluation scripts, and research materials

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: ECharts
- **Routing**: React Router
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── StatCard.jsx
│   ├── LeaderboardTable.jsx
│   ├── RadarChart.jsx
│   ├── ScatterPlot.jsx
│   ├── PieChart.jsx
│   ├── BarChart.jsx
│   └── CaseCard.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Leaderboard.jsx
│   ├── Analysis.jsx
│   ├── CaseStudies.jsx
│   └── Download.jsx
├── App.jsx             # Main app component
└── main.jsx            # Entry point

public/
└── data/               # JSON data files
    ├── leaderboard_data.json
    ├── case_study_data.json
    ├── statistics.json
    └── paper_context_data.json
```

## Deployment to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The `.github/workflows/deploy.yml` will automatically deploy on push to main

### Method 2: Manual Deployment

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

### Configuration

Update `vite.config.js` with your repository name:

```javascript
export default defineConfig({
  base: '/your-repo-name/',  // Change this to your repo name
  // ...
})
```

## Data Files

### Updating Data

All data is stored in `public/data/` as JSON files:

- **leaderboard_data.json**: Model rankings and scores
- **case_study_data.json**: Detailed case studies
- **statistics.json**: Overall benchmark statistics
- **paper_context_data.json**: Context comparison data (placeholder)

To update data, simply edit the JSON files and rebuild.

### Adding New Case Studies

Add new cases to `case_study_data.json`:

```json
{
  "id": "case_6",
  "title": "Your Case Title",
  "function": "function_name",
  "key_finding": "Main finding...",
  "technical_details": {
    "objective": "...",
    // ... more details
  }
}
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',  // Change primary color
      secondary: '#64748b',
    },
  },
}
```

### Footer

Update institution logos and links in `src/components/Footer.jsx`.

### Citation

Update BibTeX in `src/components/Footer.jsx` with your paper details.

## Development

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Citation

If you use GeoCodeBench in your research, please cite:

```bibtex
@article{geocodebench2025,
  title={GeoCodeBench: Benchmarking PhD-Level Coding in 3D Geometric Computer Vision},
  author={Your Team},
  journal={arXiv preprint},
  year={2025}
}
```

## Contact

For questions or issues, please open an issue on GitHub or contact the maintainers.
