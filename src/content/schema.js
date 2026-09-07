const CONTACT = { phone: "", phoneHref: "", whatsapp: "", email: "" };
const CATS = { testing: 'Field & Lab Testing', investigation: 'Investigation', marine: 'Marine', survey: 'Survey & GIS', engineering: 'Anchoring & Engineering' };
const SERVICES = [
    { slug: 'plate-load-testing', no: '01', name: 'Plate Load Testing', tag: 'FIELD TEST', cat: 'testing', desc: 'A dead-weight plate test performed at foundation level to measure how the ground responds to load — the most direct check of bearing behaviour before a footing is designed.', pts: ['Pressure–settlement curve and safe bearing capacity', 'Modulus of subgrade reaction (k-value) for design', 'Tested as per applicable IS codes, with signed reports'] },
    { slug: 'soil-testing-cbr', no: '02', name: 'Soil Testing / Soil CBR', tag: 'LAB + FIELD', cat: 'testing', desc: 'Laboratory and field evaluation of subgrade strength, centred on the California Bearing Ratio (CBR) — the value that decides pavement thickness for roads, yards and hardstands.', pts: ['CBR at required densities and soak conditions', 'Grain-size, Atterberg limits and compaction data', 'Subgrade assessment for pavement design'] },
    { slug: 'geotechnical-investigation', no: '03', name: 'Geotechnical Investigation', tag: 'INVESTIGATION', cat: 'investigation', desc: 'Borehole drilling, sampling and in-situ testing that profile the subsurface strata and deliver the parameters your structural designer actually needs.', pts: ['Borelogs with SPT N-values and strata description', 'Groundwater observations recorded per borehole', 'Foundation type, depth and capacity inputs'] },
    { slug: 'marine-geotechnical-investigation', no: '04', name: 'Marine Geotechnical Investigation', tag: 'NEARSHORE', cat: 'marine', desc: 'Investigation over water and along the shore for jetties, ports, bridges and coastal works — profiling soft marine clays, sand zones and rockhead where it matters most.', pts: ['Nearshore / over-water borehole investigation', 'Strata and pile-design parameters for marine structures', 'Rockhead and scour-relevant profiling'] },
    { slug: 'soil-investigation', no: '05', name: 'Soil Investigation', tag: 'INVESTIGATION', cat: 'investigation', desc: 'Scope-matched soil investigation for buildings, industrial sheds and infrastructure — from a single preliminary borehole to a full investigation grid.', pts: ['Foundation-level soil parameters', 'Settlement and bearing assessment', 'Recommendations tuned to the structure above'] },
    { slug: 'rock-anchoring', no: '06', name: 'Rock Anchoring', tag: 'EXECUTION', cat: 'engineering', desc: 'Rock anchoring and stabilization support for slopes, retaining systems and foundations in rock and mixed strata — drilled, installed and verified under recorded loads.', pts: ['Anchor drilling, installation and pull-out testing', 'Stabilization inputs for slopes and retaining walls', 'Verification testing with documented loads'] },
    { slug: 'gis-testing', no: '07', name: 'GIS Testing', tag: 'SPATIAL DATA', cat: 'survey', desc: 'GIS-based capture, mapping and analysis of spatial site data — turning field observations into layered, usable project information.', pts: ['Thematic and location mapping for sites & corridors', 'Spatial data layers for project records', 'Analysis support for planning and reporting'] },
    { slug: 'topographic-survey', no: '08', name: 'Topographic Survey', tag: 'SURVEY', cat: 'survey', desc: 'Detailed mapping of contours, levels and site features so designers start from a surface model they can trust — not assumptions.', pts: ['Contour maps and spot levels', 'Feature and utility surveys', 'Drawings ready for direct design use'] },
    { slug: 'electrical-resistivity-testing', no: '09', name: 'Electrical Resistivity Testing', tag: 'FIELD TEST', cat: 'testing', desc: 'Resistivity profiling that characterizes subsurface layers and delivers soil resistivity values — critical for earthing design and useful for strata correlation.', pts: ['Vertical and lateral resistivity profiles', 'Soil resistivity values for earthing / earthmat design', 'Interpretation with stratification notes'] },
    { slug: 'geotechnical-engineering', no: '10', name: 'Geotechnical Engineering', tag: 'ADVISORY', cat: 'engineering', desc: 'Engineering interpretation and advisory support — turning raw field and laboratory data into clear decisions on foundations, ground improvement and risk.', pts: ['Design parameters and advisory notes', 'Independent review of investigation data', 'Support from feasibility through detailing'] }
];
const GALLERY = [
    { seed: 'srsgeo-rig-01', w: 900, h: 1100, cat: 'investigation', size: 'sz-tall', cap: 'Borehole drilling — geotechnical investigation' },
    { seed: 'srsgeo-plate-02', w: 900, h: 640, cat: 'testing', size: '', cap: 'Plate load test setup on prepared subgrade' },
    { seed: 'srsgeo-spt-03', w: 900, h: 640, cat: 'investigation', size: '', cap: 'Split-spoon sampling at depth' },
    { seed: 'srsgeo-topo-04', w: 900, h: 1100, cat: 'survey', size: 'sz-tall', cap: 'Topographic survey — level observations' },
    { seed: 'srsgeo-marine-05', w: 900, h: 640, cat: 'marine', size: '', cap: 'Nearshore investigation — marine strata profiling' },
    { seed: 'srsgeo-anchor-06', w: 900, h: 640, cat: 'engineering', size: '', cap: 'Rock anchoring — drilling and installation' },
    { seed: 'srsgeo-cbr-07', w: 900, h: 640, cat: 'testing', size: '', cap: 'Soil CBR — laboratory compaction and testing' },
    { seed: 'srsgeo-res-08', w: 900, h: 1100, cat: 'testing', size: 'sz-tall', cap: 'Electrical resistivity profiling in progress' },
    { seed: 'srsgeo-gis-09', w: 900, h: 640, cat: 'survey', size: '', cap: 'GIS mapping — spatial site data' },
    { seed: 'srsgeo-pit-10', w: 900, h: 640, cat: 'investigation', size: '', cap: 'Test pit examination and in-situ logging' }
];
const TITLES = {
    '/': 'SRS Geotech & Construction — Geotechnical & Soil Testing | Raigad, Maharashtra',
    '/about': 'About — SRS Geotech & Construction | Raigad, Maharashtra',
    '/services': 'Services — Geotechnical & Soil Testing | SRS Geotech & Construction',
    '/projects': 'Projects & Field Gallery — SRS Geotech & Construction',
    '/contact': 'Contact & Request a Quote — SRS Geotech & Construction'
};
const ACCORDION_STEPS = [
    { no: '01', title: 'Reconnaissance & scoping', text: 'We visit the site, understand the structure above it, and finalise test locations, depths and counts before mobilising.' },
    { no: '02', title: 'Field investigation & in-situ testing', text: 'Testing and sampling with calibrated equipment — plate load, CBR, drilling, resistivity or survey — run with strict site-safety discipline.' },
    { no: '03', title: 'Laboratory testing & analysis', text: 'Collected samples are classified, tested and evaluated; field data is reduced, checked and correlated.' },
    { no: '04', title: 'Engineering report', text: 'A clear, actionable report — bearing capacity, subgrade reaction, strata profiles and recommendations your designer can use directly.' }
];
const PRINCIPLES = [
    { no: '01', title: 'Accuracy before speed', text: 'A test is only worth the care behind it. Calibrated equipment, proper preparation, honest data — even when the schedule is tight.' },
    { no: '02', title: 'Safety on every site', text: 'Test pits, rigs and live construction zones demand discipline. Our crews work to the same safety standard we would want on our own ground.' },
    { no: '03', title: 'Reports you can build on', text: 'Plain language, complete data, clear recommendations. A report that a structural designer can act on without a follow-up phone call.' },
    { no: '04', title: 'Straight answers, honest scope', text: 'If your site needs fewer tests than you asked for, we\'ll say so. Scope is matched to the structure — never inflated.' }
];
const ASSIGNMENTS = [
    { no: 'A1', title: 'Buildings & industrial sheds', text: 'Soil investigation and plate load testing for footings, rafts and warehouse floors.' },
    { no: 'A2', title: 'Roads & pavement works', text: 'Subgrade CBR evaluation and resistivity checks for road, yard and hardstand design.' },
    { no: 'A3', title: 'Marine & coastal structures', text: 'Nearshore geotechnical investigation for jetties, ports and waterfront foundations.' },
    { no: 'A4', title: 'Slopes & anchoring works', text: 'Rock anchoring support and ground data for stabilization and retaining systems.' }
];
const FACTS = [
    { b: '2021', text: 'Established — Raigad, Maharashtra' },
    { b: 'S Singh', text: 'Proprietor — owner-led technical accountability' },
    { b: '≤ 10', text: 'Field engineers, technicians & support staff' },
    { b: '10', text: 'Core service lines across geotech, testing & survey' }
];
const TEAM_FUNCTIONS = ['Field Crew', 'Drilling & Sampling', 'Lab Coordination', 'Survey', 'Reporting'];
const PHOTO = {
    hero: 'https://picsum.photos/seed/srsgeo-hero-drill/920/1080.jpg',
    band: 'https://picsum.photos/seed/srsgeo-onsite-crew/1500/620.jpg',
    terrain: 'https://picsum.photos/seed/srsgeo-about-terrain/1000/880.jpg',
    field: 'https://picsum.photos/seed/srsgeo-about-field/620/760.jpg'
};

// Field Types for the Admin Form Generator:
// { name, label, type: 'text' | 'textarea' | 'image' | 'list' | 'boolean' }
// For lists, provide `itemFields: []`

export const SCHEMA = {
    sitewide: {
        label: 'Sitewide Content',
        sections: {
            brand: {
                label: 'Brand & General',
                fields: [
                    { name: 'name', label: 'Company Name (Full)', type: 'text' },
                    { name: 'short', label: 'Company Name (Short)', type: 'text' },
                    { name: 'sub', label: 'Company Sub-text', type: 'text' },
                    { name: 'established', label: 'Year Established', type: 'text' },
                    { name: 'owner', label: 'Proprietor Name', type: 'text' },
                    { name: 'location', label: 'Location (Short)', type: 'text' },
                    { name: 'locationFull', label: 'Location (Full)', type: 'text' },
                ],
                defaultContent: {
                    name: 'SRS Geotech & Construction',
                    short: 'SRS GEOTECH',
                    sub: '& Construction',
                    established: '2021',
                    owner: 'S Singh',
                    location: 'Raigad · MH',
                    locationFull: 'Raigad, Maharashtra, India'
                }
            },
            topbar: {
                label: 'Top Bar (Header)',
                fields: [
                    { name: 'leftText', label: 'Left Text', type: 'text' },
                    { name: 'rightText', label: 'Right Text', type: 'text' },
                ],
                defaultContent: {
                    leftText: 'Geotechnical · Soil Testing · Survey + Raigad, Maharashtra',
                    rightText: 'Established 2021 · Proprietorship'
                }
            },
            footer: {
                label: 'Footer',
                fields: [
                    { name: 'blurb', label: 'Company Blurb', type: 'textarea' },
                    { name: 'tag1', label: 'Tag 1', type: 'text' },
                    { name: 'tag2', label: 'Tag 2', type: 'text' },
                    { name: 'tag3', label: 'Tag 3', type: 'text' },
                    { name: 'barLeft', label: 'Bottom Bar Left', type: 'text' },
                    { name: 'barRight', label: 'Bottom Bar Right', type: 'text' },
                ],
                defaultContent: {
                    blurb: 'Geotechnical & soil testing services from Raigad, Maharashtra. Established 2021 — plate load, CBR, investigation, survey and anchoring, delivered with owner-led accountability.',
                    tag1: 'Est. 2021',
                    tag2: 'Raigad · MH',
                    tag3: 'Proprietorship',
                    barLeft: '© {year} SRS Geotech & Construction · Proprietorship',
                    barRight: 'Geotechnical · Soil · Survey'
                }
            },
            contact: {
                label: 'Contact Details',
                fields: [
                    { name: 'phone', label: 'Phone Number (Display)', type: 'text' },
                    { name: 'phoneHref', label: 'Phone Href (e.g. +91...)', type: 'text' },
                    { name: 'whatsapp', label: 'WhatsApp Number', type: 'text' },
                    { name: 'email', label: 'Email Address', type: 'text' }
                ],
                defaultContent: CONTACT
            },
            nav: {
                label: 'Navigation Labels',
                fields: [
                    { name: 'home', label: 'Home Label', type: 'text' },
                    { name: 'about', label: 'About Label', type: 'text' },
                    { name: 'services', label: 'Services Label', type: 'text' },
                    { name: 'projects', label: 'Projects Label', type: 'text' },
                    { name: 'contact', label: 'Contact Label', type: 'text' },
                    { name: 'viewAll', label: 'View all → Label', type: 'text' },
                    { name: 'pagesHeading', label: 'Pages Heading', type: 'text' },
                    { name: 'servicesHeading', label: 'Services Heading', type: 'text' },
                    { name: 'contactHeading', label: 'Contact Heading', type: 'text' }
                ],
                defaultContent: {
                    home: 'Home',
                    about: 'About',
                    services: 'Services',
                    projects: 'Projects',
                    contact: 'Contact',
                    viewAll: 'View all',
                    pagesHeading: 'Pages',
                    servicesHeading: 'Services',
                    contactHeading: 'Contact'
                }
            },
            ui: {
                label: 'Global UI Elements',
                fields: [
                    { name: 'btnQuote', label: 'Quote Button Label', type: 'text' },
                    { name: 'btnServices', label: 'Services Button Label', type: 'text' },
                    { name: 'btnCall', label: 'Call Us Label', type: 'text' },
                    { name: 'btnMoreAbout', label: 'More About Us Label', type: 'text' },
                    { name: 'btnRequestService', label: 'Request Service Label', type: 'text' },
                    { name: 'toastSuccess', label: 'Toast Form Success Message', type: 'text' },
                    { name: 'toastFail', label: 'Toast Form Error Message', type: 'text' }
                ],
                defaultContent: {
                    btnQuote: 'Request a Quote',
                    btnServices: 'Explore Services',
                    btnCall: 'Call Us',
                    btnMoreAbout: 'More about us',
                    btnRequestService: 'Request this service',
                    toastSuccess: 'Your message has been sent. We will respond shortly.',
                    toastFail: 'Failed to send your message. Please try again.'
                }
            }
        }
    },
    seo: {
        label: 'SEO',
        sections: {
            metadata: {
                label: 'Search Engine & Social Metadata',
                fields: [
                    { name: 'ogImage', label: 'Default Open Graph Image URL (1200×630)', type: 'image' },
                    { name: '/', label: 'Home Page', type: 'object', objectFields: [
                        { name: 'title', label: 'Page Title', type: 'text' },
                        { name: 'description', label: 'Meta Description', type: 'textarea' },
                        { name: 'ogImage', label: 'OG Image URL', type: 'image' }
                    ] },
                    { name: '/about', label: 'About Page', type: 'object', objectFields: [
                        { name: 'title', label: 'Page Title', type: 'text' },
                        { name: 'description', label: 'Meta Description', type: 'textarea' },
                        { name: 'ogImage', label: 'OG Image URL', type: 'image' }
                    ] },
                    { name: '/services', label: 'Services Page', type: 'object', objectFields: [
                        { name: 'title', label: 'Page Title', type: 'text' },
                        { name: 'description', label: 'Meta Description', type: 'textarea' },
                        { name: 'ogImage', label: 'OG Image URL', type: 'image' }
                    ] },
                    { name: '/projects', label: 'Projects Page', type: 'object', objectFields: [
                        { name: 'title', label: 'Page Title', type: 'text' },
                        { name: 'description', label: 'Meta Description', type: 'textarea' },
                        { name: 'ogImage', label: 'OG Image URL', type: 'image' }
                    ] },
                    { name: '/contact', label: 'Contact Page', type: 'object', objectFields: [
                        { name: 'title', label: 'Page Title', type: 'text' },
                        { name: 'description', label: 'Meta Description', type: 'textarea' },
                        { name: 'ogImage', label: 'OG Image URL', type: 'image' }
                    ] }
                ],
                defaultContent: {
                    ogImage: 'https://srsgeotech.com/og-image.jpg',
                    '/': {
                        title: TITLES['/'],
                        description: 'SRS Geotech & Construction provides geotechnical, soil testing and construction services in Raigad, Maharashtra. Plate load, CBR, investigation, marine, survey, resistivity and anchoring — established 2021.',
                        ogImage: 'https://srsgeotech.com/og-image.jpg'
                    },
                    '/about': {
                        title: TITLES['/about'],
                        description: 'About SRS Geotech & Construction — a proprietorship founded 2021 in Raigad, Maharashtra, delivering owner-led geotechnical, soil testing and survey services with a small, accountable team.',
                        ogImage: 'https://srsgeotech.com/og-image.jpg'
                    },
                    '/services': {
                        title: TITLES['/services'],
                        description: 'Explore SRS Geotech & Construction services — plate load testing, soil CBR, geotechnical & marine investigation, rock anchoring, GIS, topographic survey, resistivity testing and geotechnical engineering.',
                        ogImage: 'https://srsgeotech.com/og-image.jpg'
                    },
                    '/projects': {
                        title: TITLES['/projects'],
                        description: 'A gallery of geotechnical and soil testing field work by SRS Geotech & Construction — borehole investigation, plate load, soil CBR, marine investigation, rock anchoring, GIS and topographic survey.',
                        ogImage: 'https://srsgeotech.com/og-image.jpg'
                    },
                    '/contact': {
                        title: TITLES['/contact'],
                        description: 'Contact SRS Geotech & Construction in Raigad, Maharashtra to request a geotechnical, soil testing or survey quote. Call, WhatsApp or email our owner-led team today.',
                        ogImage: 'https://srsgeotech.com/og-image.jpg'
                    }
                }
            }
        }
    },
    home: {
        label: 'Home Page',
        sections: {
            hero: {
                label: 'Hero',
                fields: [
                    { name: 'kick', label: 'Kick Text', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'titleHl', label: 'Title Highlight', type: 'text' },
                    { name: 'titleRest', label: 'Title Remainder', type: 'text' },
                    { name: 'lead', label: 'Lead Text', type: 'textarea' },
                    { name: 'fact1', label: 'Fact 1', type: 'text' },
                    { name: 'fact2', label: 'Fact 2', type: 'text' },
                    { name: 'fact3', label: 'Fact 3', type: 'text' },
                    { name: 'heroImage', label: 'Hero Image URL', type: 'image' },
                    { name: 'heroImgAlt', label: 'Hero Image Alt Text', type: 'text' },
                    { name: 'specTitle', label: 'Capability Sheet Title', type: 'text' },
                    { name: 'spec1', label: 'Spec Row 1 Value', type: 'text' },
                    { name: 'spec1label', label: 'Spec Row 1 Label', type: 'text' },
                    { name: 'spec2', label: 'Spec Row 2 Value', type: 'text' },
                    { name: 'spec2label', label: 'Spec Row 2 Label', type: 'text' },
                    { name: 'spec3', label: 'Spec Row 3 Value', type: 'text' },
                    { name: 'spec3label', label: 'Spec Row 3 Label', type: 'text' }
                ],
                defaultContent: {
                    kick: 'GEOTECHNICAL & CIVIL',
                    title: 'Securing the ground',
                    titleHl: 'beneath',
                    titleRest: '\nyour build.',
                    lead: 'SRS Geotech & Construction delivers precise geotechnical ground investigation, soil testing, and topographic surveying to de-risk engineering projects across India.',
                    fact1: 'Est. 2021',
                    fact2: 'Raigad · Maharashtra',
                    fact3: 'Proprietorship · S Singh',
                    heroImage: PHOTO.hero,
                    heroImgAlt: 'Geotechnical field investigation equipment at a prepared test location',
                    specTitle: 'CAPABILITY SHEET — ',
                    spec1: 'Plate load · CBR · DPT',
                    spec1label: 'FIELD',
                    spec2: 'Boreholes · SPT · sampling',
                    spec2label: 'INVESTIGATION',
                    spec3: 'Resistivity · GIS · topo',
                    spec3label: 'SURVEY'
                }
            },
            featuredServices: {
                label: 'Featured Services (Ticker)',
                fields: [
                    {
                        name: 'items', label: 'Ticker Items', type: 'list', itemFields: [
                            { name: 'name', label: 'Service Name', type: 'text' }
                        ]
                    }
                ],
                defaultContent: {
                    items: SERVICES.map(s => ({ name: s.name }))
                }
            },
            capabilities: {
                label: 'Capabilities (Services summary)',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'What we do',
                    title: 'Ten services. One responsibility — the ground.',
                    desc: 'From plate load and CBR testing to marine investigation and topographic survey, we cover the field-work chain end to end — so design decisions rest on measured data, not assumptions.'
                }
            },
            process: {
                label: 'Process (How we work)',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                    {
                        name: 'steps', label: 'Steps', type: 'list', itemFields: [
                            { name: 'no', label: 'Number', type: 'text' },
                            { name: 'title', label: 'Title', type: 'text' },
                            { name: 'text', label: 'Text', type: 'textarea' }
                        ]
                    }
                ],
                defaultContent: {
                    kick: 'How we work',
                    title: 'A disciplined four-step method.',
                    desc: 'Every assignment follows the same sequence — scoped clearly, executed safely, reported plainly. No surprises in the field, no ambiguity in the report.',
                    steps: ACCORDION_STEPS
                }
            },
            factsBand: {
                label: 'Facts & Practice Band',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'lead', label: 'Lead', type: 'textarea' },
                    { name: 'photoUrl', label: 'Photo URL', type: 'image' },
                    { name: 'caption', label: 'Photo Caption', type: 'text' },
                    {
                        name: 'facts', label: 'Facts List', type: 'list', itemFields: [
                            { name: 'b', label: 'Bold Text', type: 'text' },
                            { name: 'text', label: 'Description', type: 'text' }
                        ]
                    }
                ],
                defaultContent: {
                    kick: 'The practice',
                    title: 'A focused team, not a faceless one.',
                    lead: 'SRS Geotech & Construction is deliberately compact — a proprietorship where the owner stays close to every test, every borelog and every report that leaves the office.',
                    photoUrl: PHOTO.band,
                    caption: 'On site — investigation & testing works, Raigad district',
                    facts: FACTS
                }
            },
            ctaBand: {
                label: 'CTA Band',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'text', label: 'Text', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'Next step',
                    title: 'Planning construction on untested ground?',
                    text: "Send your site details — we'll scope the right tests, quote transparently and get a crew scheduled."
                }
            }
        }
    },
    about: {
        label: 'About Page',
        sections: {
            hero: {
                label: 'Page Hero',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'lead', label: 'Lead', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'About the firm',
                    title: 'A focused geotechnical practice, built on field discipline.',
                    lead: 'Established in 2021 in Raigad, Maharashtra — a proprietorship led by S Singh, keeping technical accountability where it belongs: with the owner.'
                }
            },
            story: {
                label: 'The Story & Profile',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'p1', label: 'Paragraph 1', type: 'textarea' },
                    { name: 'p2', label: 'Paragraph 2', type: 'textarea' },
                    { name: 'p3', label: 'Paragraph 3', type: 'textarea' },
                    {
                        name: 'profile', label: 'Profile Facts', type: 'list', itemFields: [
                            { name: 'dt', label: 'Label', type: 'text' },
                            { name: 'dd', label: 'Value', type: 'text' }
                        ]
                    }
                ],
                defaultContent: {
                    kick: 'The firm',
                    title: 'Small by design. Serious about the ground.',
                    p1: 'SRS Geotech & Construction provides geotechnical and soil testing services from Raigad, Maharashtra — the data that foundations, pavements and structures are quietly built on.',
                    p2: 'We exist because ground data is often the weakest link in a project: rushed tests, vague reports and nobody accountable. As a proprietorship established in 2021, we run the opposite model — a compact team of up to ten people, owner supervision on the work that matters, and reports written to be used, not filed.',
                    p3: 'Our scope spans the full ground-engineering chain: in-situ testing such as plate load and resistivity, laboratory evaluation including soil CBR, borehole-based geotechnical and marine investigation, rock anchoring support, and survey services covering topographic mapping and GIS data.',
                    profile: [
                        { dt: 'Entity', dd: 'Proprietorship' },
                        { dt: 'Established', dd: '2021' },
                        { dt: 'Proprietor', dd: 'S Singh' },
                        { dt: 'Location', dd: 'Raigad, Maharashtra, India' },
                        { dt: 'Team', dd: 'Up to 10 people' },
                        { dt: 'Focus', dd: 'Geotechnical & soil testing services' }
                    ]
                }
            },
            principles: {
                label: 'Principles',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    {
                        name: 'list', label: 'Principles List', type: 'list', itemFields: [
                            { name: 'no', label: 'Number', type: 'text' },
                            { name: 'title', label: 'Title', type: 'text' },
                            { name: 'text', label: 'Text', type: 'textarea' }
                        ]
                    }
                ],
                defaultContent: {
                    kick: 'How we operate',
                    title: 'Four commitments, kept on every site.',
                    list: PRINCIPLES
                }
            },
            team: {
                label: 'The Team & Photos',
                fields: [
                    { name: 'terrainPhoto', label: 'Terrain Photo URL', type: 'image' },
                    { name: 'fieldPhoto', label: 'Field Photo URL', type: 'image' },
                    { name: 'proprietorRole', label: 'Proprietor Role', type: 'text' },
                    { name: 'proprietorName', label: 'Proprietor Name', type: 'text' },
                    { name: 'proprietorBio', label: 'Proprietor Bio', type: 'textarea' },
                    { name: 'teamDesc', label: 'Team Description', type: 'textarea' },
                    {
                        name: 'functions', label: 'Team Functions', type: 'list', itemFields: [
                            { name: 'name', label: 'Function Name', type: 'text' }
                        ]
                    }
                ],
                defaultContent: {
                    terrainPhoto: PHOTO.terrain,
                    fieldPhoto: PHOTO.field,
                    proprietorRole: 'Proprietor',
                    proprietorName: 'S Singh',
                    proprietorBio: "Leads the firm's technical work — scoping assignments, supervising field crews and standing behind every report issued in the firm's name.",
                    teamDesc: 'Behind the proprietor is a compact, multi-skilled team of up to ten — the people who set up the plates, drill the boreholes, run the surveys and assemble the data.',
                    functions: TEAM_FUNCTIONS.map(f => ({ name: f }))
                }
            },
            ctaBand: {
                label: 'CTA Band',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'text', label: 'Text', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'Work with us',
                    title: 'Ground data you can put your name on.',
                    text: 'Tell us about your site and structure — we\'ll propose the right investigation scope.'
                }
            }
        }
    },
    services: {
        label: 'Services Page',
        sections: {
            hero: {
                label: 'Page Hero',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'lead', label: 'Lead', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'Services — 10 lines',
                    title: 'Testing, investigation & survey — end to end.',
                    lead: 'Every service below is delivered by our own field crews with owner supervision. Open any line for what it covers and what you receive.'
                }
            },
            categories: {
                label: 'Service Categories',
                fields: [
                    {
                        name: 'cats', label: 'Categories List', type: 'list', itemFields: [
                            { name: 'key', label: 'Key', type: 'text' },
                            { name: 'label', label: 'Label', type: 'text' }
                        ]
                    }
                ],
                defaultContent: {
                    cats: Object.entries(CATS).map(([key, label]) => ({ key, label }))
                }
            },
            list: {
                label: 'Services List',
                fields: [
                    {
                        name: 'items', label: 'Services', type: 'list', itemFields: [
                            { name: 'slug', label: 'Slug / ID', type: 'text' },
                            { name: 'no', label: 'Number', type: 'text' },
                            { name: 'name', label: 'Name', type: 'text' },
                            { name: 'tag', label: 'Tag', type: 'text' },
                            { name: 'cat', label: 'Category Key', type: 'text' },
                            { name: 'desc', label: 'Description', type: 'textarea' },
                            { name: 'pts', label: 'Points (Line separated)', type: 'textarea' }
                        ]
                    },
                    { name: 'scopeNote', label: 'Services Scope Note', type: 'text' }
                ],
                defaultContent: {
                    items: SERVICES.map(s => ({
                        ...s,
                        pts: s.pts.join('\n')
                    })),
                    scopeNote: '// Scope notes are indicative — final test counts & depths are fixed after site reconnaissance, as per applicable IS codes.'
                }
            },
            ctaBand: {
                label: 'CTA Band',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'text', label: 'Text', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'Not sure what you need?',
                    title: "Describe the structure — we'll scope the tests.",
                    text: "Send us the location, structure type and stage of your project. We'll recommend the minimum scope that answers the design question."
                }
            }
        }
    },
    projects: {
        label: 'Projects Page',
        sections: {
            hero: {
                label: 'Page Hero',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'lead', label: 'Lead', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'Projects · Field gallery',
                    title: 'The work, up close.',
                    lead: 'A look at the investigation, testing and survey methods we deliver in the field. Representative imagery of the work — ask us for references relevant to your site.'
                }
            },
            gallery: {
                label: 'Gallery',
                fields: [
                    {
                        name: 'items', label: 'Gallery Images', type: 'list', itemFields: [
                            { name: 'seed', label: 'Image Seed/ID', type: 'text' },
                            { name: 'w', label: 'Width (px)', type: 'number' },
                            { name: 'h', label: 'Height (px)', type: 'number' },
                            { name: 'cat', label: 'Category Key', type: 'text' },
                            { name: 'size', label: 'Size class', type: 'text' },
                            { name: 'cap', label: 'Caption', type: 'text' },
                            { name: 'url', label: 'Image URL (optional override)', type: 'image' }
                        ]
                    },
                    { name: 'scopeNote', label: 'View all Projects scope note', type: 'text' }
                ],
                defaultContent: {
                    items: GALLERY,
                    scopeNote: 'Representative imagery of the work — ask us for references relevant to your site.'
                }
            },
            assignments: {
                label: 'Typical Assignments',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    {
                        name: 'list', label: 'Assignments', type: 'list', itemFields: [
                            { name: 'no', label: 'Number', type: 'text' },
                            { name: 'title', label: 'Title', type: 'text' },
                            { name: 'text', label: 'Description', type: 'textarea' }
                        ]
                    }
                ],
                defaultContent: {
                    kick: 'Typical assignments',
                    title: 'Where our data gets used.',
                    list: ASSIGNMENTS
                }
            },
            ctaBand: {
                label: 'CTA Band',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'text', label: 'Text', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'Your site next',
                    title: 'Have ground work coming up?',
                    text: "Share your project details and we'll respond with a scoped, itemised proposal."
                }
            }
        }
    },
    contact: {
        label: 'Contact Page',
        sections: {
            hero: {
                label: 'Page Hero',
                fields: [
                    { name: 'kick', label: 'Kick', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'lead', label: 'Lead', type: 'textarea' }
                ],
                defaultContent: {
                    kick: 'Contact',
                    title: 'Tell us about your site.',
                    lead: 'Request a quote, ask about a test, or check availability for your location in and around Raigad. We respond to every genuine enquiry.'
                }
            },
            sidebar: {
                label: 'Side Cards & Info',
                fields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'sub', label: 'Sub-text', type: 'textarea' },
                    { name: 'mapLabel', label: 'Map Label', type: 'text' },
                    { name: 'noDirectContactMsg', label: 'Missing Contact Details Message', type: 'textarea' }
                ],
                defaultContent: {
                    title: 'Prefer to talk?',
                    sub: 'Reach us directly, or use the form — whichever is faster for you.',
                    mapLabel: 'Our ground — ',
                    noDirectContactMsg: 'Direct phone and email are being set up on this listing. The fastest way to reach us is the quote request form — we respond to every genuine enquiry.'
                }
            },
            form: {
                label: 'Form UI Elements',
                fields: [
                    { name: 'fLabelType', label: 'Field: Project Type', type: 'text' },
                    { name: 'fLabelLocation', label: 'Field: Location/Village', type: 'text' },
                    { name: 'fLabelReq', label: 'Field: Request details', type: 'text' },
                    { name: 'fLabelServices', label: 'Field: Required Services', type: 'text' },
                    { name: 'fLabelName', label: 'Field: Your Name', type: 'text' },
                    { name: 'fLabelPhone', label: 'Field: Phone', type: 'text' },
                    { name: 'fLabelEmail', label: 'Field: Email', type: 'text' },
                    { name: 'fSubName', label: 'Name instruction', type: 'text' },
                    { name: 'fSubPhone', label: 'Phone instruction', type: 'text' },
                    { name: 'errRequired', label: 'Error message: required', type: 'text' },
                    { name: 'errPhone', label: 'Error message: invalid phone', type: 'text' },
                    { name: 'errEmail', label: 'Error message: invalid email', type: 'text' },
                    { name: 'btnSubmit', label: 'Submit Button Label', type: 'text' },
                    { name: 'btnSending', label: 'Sending Label', type: 'text' },
                    { name: 'btnSent', label: 'Success Label', type: 'text' }
                ],
                defaultContent: {
                    fLabelType: 'Project type',
                    fLabelLocation: 'Location or village',
                    fLabelReq: 'Request details or scope',
                    fLabelServices: 'Required services',
                    fLabelName: 'Your name',
                    fLabelPhone: 'Phone number',
                    fLabelEmail: 'Email',
                    fSubName: 'First & last name',
                    fSubPhone: 'We’ll call back',
                    errRequired: 'This field is required.',
                    errPhone: 'Please enter a valid 10-digit Indian phone number.',
                    errEmail: 'Please enter a valid email address.',
                    btnSubmit: 'Send Request',
                    btnSending: 'Sending...',
                    btnSent: 'Request Sent'
                }
            }
        }
    }
};
