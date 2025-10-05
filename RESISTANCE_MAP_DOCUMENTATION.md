# Resistance Map Documentation

## Overview

The Resistance Map is an admin-only feature that visualizes team and organizational resistance patterns using category-specific archetypes. Each of the 6 paid assessment categories has its own unique set of 8 archetypes with 2-4 letter abbreviations for easy reference.

**Data Source**: The Resistance Map uses existing assessment result data from the paid assessment tables (`leadership_assessment_results`, `middle_management_assessment_results`, `team_communication_assessment_results`, `career_growth_assessment_results`, `sales_assessment_results`, and `individual_assessment_results`). It aggregates archetype scores from the latest completed assessment per person to provide organization and team-level insights.

## Access Control

**Admin-only access**: Only `resistanceintellegence@gmail.com` can view the Resistance Map feature.

**Assessment Tier Filtering**: The Resistance Map only displays data for **paid assessments**. Free assessments are excluded from all visualizations and aggregations.

## Assessment Categories & Archetypes

### 1. Leadership (8 archetypes)

| Abbreviation | Name | Description |
|--------------|------|-------------|
| **SA** | Strategic Architect | Relies on long-range frameworks and resists committing without validated roadmaps |
| **ED** | Empowering Delegator | Steps back and trusts teams to execute with minimal oversight |
| **VDI** | Vision Driven Innovator | Resists advancing initiatives until they fully reflect original vision |
| **CH** | Collaborative Harmonizer | Prioritizes maintaining unity and civility, sometimes at the expense of deeper conflict |
| **DCA** | Decisive Change Agent | Energized by bold pivots and quick action, even with incomplete alignment |
| **PCC** | People-Centric Coach | Invests extra time in individual growth and development |
| **RAS** | Risk-Aware Stabilizer | Defaults to protecting stability, even when it means delaying bold bets |
| **ODA** | Outcome-Driven Achiever | Prioritizes immediate, visible results as the primary measure of success |

### 2. Middle Management (8 archetypes)

| Abbreviation | Name | Description |
|--------------|------|-------------|
| **MM** | Micromanager | Steps in to re-do or double-check team's work, staying closely involved in details |
| **BM** | Bottleneck Manager | Decisions wait on them before progress can continue |
| **FF** | Firefighter | Spends more time reacting to urgent issues than planning ahead |
| **OD** | Overloaded Doer | Takes on more work than realistically manageable, saying yes too often |
| **CA** | Conflict Avoider | Softens or delays feedback to maintain peace and avoid disagreement |
| **CS** | Credit Seeker | Highlights their role in successes to ensure visibility with leadership |
| **DM** | Detached Manager | Disengages from team when work feels overwhelming |
| **RBO** | Rule-Bound Operator | Prefers strict processes and procedures, even if they slow progress |

### 3. Team Communication (8 archetypes)

| Abbreviation | Name | Description |
|--------------|------|-------------|
| **WH** | Withholder | Holds back concerns and stays silent in meetings to avoid conflict |
| **GC** | Guarded Collaborator | Shares only part of thinking until trust is established |
| **DOM** | Dominator | Pushes hard to make sure their voice is heard and takes control of conversations |
| **PM** | Peacemaker | Agrees quickly to avoid disagreement and maintain group harmony |
| **FRAG** | Fragmenter | Prefers to keep control over their part, sharing updates only within immediate group |
| **COC** | Closed-Off Colleague | Rarely volunteers ideas and keeps input brief or minimal |
| **DIST** | Distractor | Uses humor and tangents even if it takes focus away from core issues |
| **OA** | Over-Adapter | Adjusts tone or stance to match others, hiding their real view |

### 4. Career Growth (8 archetypes)

| Abbreviation | Name | Description |
|--------------|------|-------------|
| **IC** | Invisible Contributor | Lets others take credit and rarely shares progress updates |
| **RS** | Recognition Seeker | Looks for opportunities that make them visible to leadership |
| **RA** | Risk Avoider | Hesitates to pursue opportunities unless feeling completely ready |
| **RL** | Reluctant Leader | Hesitates to take leadership roles even when qualified |
| **PP** | People-Pleaser | Struggles to say no, prioritizing harmony over career goals |
| **OQ** | Over-Qualifier | Avoids applying for roles unless exceeding every requirement |
| **SR** | Strength Reliant | Prefers to rely on mastered skills, resisting unfamiliar abilities |
| **CZ** | Comfort Zoner | Prefers predictable assignments over high-stakes projects |

### 5. Sales (8 archetypes)

| Abbreviation | Name | Description |
|--------------|------|-------------|
| **OP** | Over Promiser | Agrees to customer requests even when unsure of delivery capability |
| **CC** | Closer Controller | Pushes hard to control conversation and steer toward quick close |
| **RP** | Relationship Pleaser | Avoids difficult questions to keep interactions friendly and avoid tension |
| **DG** | Discount Giver | Quickly offers discounts when sensing hesitation instead of exploring value |
| **PD** | Product Drowner | Goes into great detail about features, losing focus on customer needs |
| **PA** | Pipeline Avoider | Procrastinates on prospecting, relying on inbound or referrals |
| **RF** | Reactive Firefighter | Chases urgent deals while ignoring steady pipeline work |
| **SIR** | Silent Resistor | Waits for customer to decide instead of asking for the close |

### 6. Individual Performance (8 archetypes)

| Abbreviation | Name | Description |
|--------------|------|-------------|
| **PA** | Perfectionist Achiever | Rechecks and refines work multiple times, hesitating to share until flawless |
| **HOG** | Helper / Over-Giver | Takes on extra responsibilities to support others, struggles to say no |
| **AV** | Avoider | Delays starting tasks that feel uncomfortable or uncertain |
| **CE** | Cautious Evaluator | Overthinks decisions and double-checks plans multiple times before starting |
| **ID** | Independent Doer | Prefers to work independently and resists relying on others |
| **RSI** | Recognition Seeker | More motivated when efforts are noticed and contributions are visible |
| **OC** | Over-Controller | Feels things go better when in control, struggles to delegate |
| **CZI** | Comfort Zoner | Prefers steady, predictable tasks over high-stakes challenges |

## Resistance Bands

All archetypes are scored on a 0-100% scale and categorized into three resistance bands:

| Band | Range | Description |
|------|-------|-------------|
| **Low** | 0-34% | Healthy balance, adaptive use of pattern |
| **Moderate** | 35-54% | Some resistance, protective behaviors present |
| **High** | 55-100% | Significant resistance, restrictive patterns dominant |

## Database Architecture

### Key Tables

1. **archetypes** - Taxonomy of 48 archetypes (8 per category)
   - `code`: Unique slug identifier (e.g., "strategic-architect")
   - `shortLabel`: 2-4 letter abbreviation (e.g., "SA")
   - `name`: Full archetype name
   - `description`: Archetype description
   - `context`: Assessment category (leadership, middle_management, team_communication, career_growth, sales, individual)

2. **assessment_templates** - Assessment configurations
   - Links to specific assessment versions
   - Maps to archetype context

3. **assessment_attempts** - Individual assessment sessions
   - Tracks who took the assessment and when

4. **archetype_scores** - Normalized scores for each archetype
   - `raw`: Raw score from assessment
   - `pct`: Normalized 0-100 percentage
   - `band`: Resistance band (low/moderate/high)

5. **derived_metrics** - Overall metrics
   - Overall resistance percentage
   - Balancing index
   - Dominant archetype
   - Profile type

## API Endpoints

### GET /api/resistance-map/archetypes
**Query Parameters:**
- `context` (optional): Filter archetypes by assessment category

**Returns:** Array of archetypes with abbreviations

**Example:**
```json
GET /api/resistance-map/archetypes?context=leadership

[
  {
    "id": "uuid",
    "code": "strategic-architect",
    "shortLabel": "SA",
    "name": "Strategic Architect",
    "description": "...",
    "context": "leadership"
  },
  ...
]
```

### GET /api/resistance-map/organizations/:orgId
**Query Parameters:**
- `template`: Assessment template slug (e.g., "leadership_paid_v1")
- `window`: Time window ("latest_per_person", "30d", "quarter", "all_time")

**Returns:** Organization resistance map with mean and P90 scores

### GET /api/resistance-map/teams/:teamId
**Query Parameters:**
- `template`: Assessment template slug
- `window`: Time window

**Returns:** Team resistance map with aggregated scores

### GET /api/resistance-map/organizations/:orgId/teams
**Returns:** Array of teams for the organization

## Frontend Visualization

The resistance map provides multiple visualization modes:

### Radar Chart
- Shows team/org mean and P90 percentile values
- Uses archetype abbreviations (SA, VDI, CH, etc.) as labels
- Provides interactive tooltips showing full archetype names and scores
- Displays up to 8 category-specific archetypes

### Resistance Heatmap Grid
- Visual heat grid showing all 8 archetypes with color-coded resistance bands
- Green (Low: 0-34%): Healthy balance, adaptive use
- Yellow (Moderate: 35-54%): Some resistance, protective behaviors
- Red (High: 55-100%): Significant resistance, restrictive patterns
- Hover effects for easy comparison across archetypes

### Archetype Cards
- Display abbreviation + full name with color-coded resistance band
- Show current mean score for each archetype
- Organized list format for detailed review

### Band Legend
- Explains the three resistance levels with correct ranges
- Provides interpretation guidance for each band

## Seeding Data

The canonical archetype configuration is defined in `server/archetype-config.ts`. To reseed all archetypes:

```bash
npx tsx server/seed-all-archetypes.ts
```

This script:
1. Validates all 6 categories have exactly 8 archetypes (48 total)
2. Clears existing archetype data
3. Inserts canonical archetypes with abbreviations
4. Creates demo organization and teams
5. Creates 6 assessment templates (one per category)

## Navigation

Access the Resistance Map through:
- Dashboard dropdown menu → "Resistance Map" link
- Direct URL: `/resistance-map` (admin-only)

## Current Data Structure vs Full Implementation

### What's Currently Implemented

The current implementation uses existing assessment result data:

- **Data Source**: Existing paid assessment result tables
  - `leadership_assessment_results`
  - `middle_management_assessment_results`
  - `team_communication_assessment_results`
  - `career_growth_assessment_results`
  - `sales_assessment_results`
  - `individual_assessment_results`

- **Archetype Scores**: Extracted from JSONB `archetype_scores` column
  - Contains `archetypeId` and `percentageScore` (0-100)
  - Aggregated using latest-per-person logic
  - Calculates mean and P90 percentiles

- **Visualizations**:
  - Radar chart showing mean and P90 scores
  - Resistance heatmap grid showing color-coded resistance bands
  - Archetype cards with band classifications

### Future Enhancements for Full Protective/Restrictive Analysis

The resistance map documentation describes a more advanced "protective vs restrictive" heatmap that requires additional data structure:

**Would require:**
1. **Context Tags on Assessment Items**: Tag each question with context categories (decision_making, delegation, collaboration, results, risk, coaching)
2. **Context-Weighted Scores**: Store `context_archetype_score` table tracking scores per context
3. **Situational Mode Calculation**: Compute protective vs restrictive classifications per context based on score thresholds and question orientation
4. **Heatmap Context Aggregation**: Store protective/restrictive counts in `heatmap_context_agg` table

**Example future heatmap data:**
```json
{
  "contexts": ["decision_making", "collaboration", "delegation", "results"],
  "protective_counts": {"decision_making": {"DCA": 9, "RAS": 7}},
  "restrictive_counts": {"decision_making": {"SA": 11}, "collaboration": {"CH": 10}}
}
```

This would enable more nuanced analysis showing when patterns are protective (helpful in context) vs restrictive (limiting performance).

## Current Capabilities

- ✅ View resistance patterns across 6 paid assessment categories
- ✅ Aggregate scores by team and organization
- ✅ Latest-per-person filtering to prevent power user bias
- ✅ Mean and P90 percentile calculations
- ✅ Color-coded resistance band classification
- ✅ Radar chart and heatmap visualizations
- ✅ Category-specific archetype filtering (8 per category)

## Planned Enhancements

- Add team-level filtering and comparison
- Export resistance map reports (PDF/CSV)
- Historical trend analysis over time
- Individual user archetype profiles
- Advanced protective/restrictive mode analysis (requires context tagging)
- Team vs organization comparison views
- Drill-down to individual assessment responses

---

**Version**: 2.0  
**Last Updated**: October 3, 2025  
**Contact**: For questions or support, contact your system administrator
