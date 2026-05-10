export type TemplateTab = {
  label: string;
  language: "typescript" | "bash" | "python" | "json";
  code: string;
};

export type Template = {
  slug: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  integrationEmoji: string;
  integrationName: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  setupTime: string;
  githubUrl: string;
  demoUrl?: string;
  whatItDoes: string[];
  tabs: TemplateTab[];
};

export const CATEGORIES = [
  "All",
  "Slack",
  "Design Tools",
  "Automation",
] as const;

export const templates: Template[] = [
  {
    slug: "slack-ai-agent",
    category: "Slack",
    title: "Slack AI Agent",
    description:
      "Describe your campaign in Slack — agent asks smart questions and generates a full asset kit",
    longDescription:
      "A production-ready AI agent that lives in Slack. Marketing teams describe what they need in plain English and the agent handles the rest — asking smart questions, generating on-brand images for every platform, and posting them directly in the thread with Regenerate and Download buttons.",
    integrationEmoji: "💬",
    integrationName: "Slack",
    tags: ["TypeScript", "Supabase", "OpenAI", "Slack API"],
    difficulty: "Intermediate",
    setupTime: "15 min",
    githubUrl: "https://github.com/Guru6163/bloom-slack",
    whatItDoes: [
      "Mention @Bloom in any Slack channel to start a campaign conversation",
      "GPT-4o with tool calling understands your brief in natural language",
      "Automatically generates images for every platform you specify",
      "Remembers conversation context within each Slack thread",
      "Each workspace stores its own Bloom API key via OAuth + /bloom-gen setup",
      "Brand can be changed anytime via slash command or natural language",
    ],
    tabs: [
      {
        label: "Setup",
        language: "bash",
        code: `# 1. Clone and link Supabase
git clone https://github.com/Guru6163/bloom-slack
cd bloom-slack
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# 2. Run database migrations
supabase db push

# 3. Create your Slack App
# Go to api.slack.com/apps → Create New App → From Manifest
# Use the manifest in the repo: slack-manifest.json
# After creating:
#   Basic Information → App Credentials → copy:
#     - Client ID
#     - Client Secret
#     - Signing Secret
#   OAuth & Permissions → install to workspace → copy:
#     - Bot User OAuth Token (xoxb-...)

# 4. Set secrets
supabase secrets set OPENAI_API_KEY="sk-..."
supabase secrets set SLACK_CLIENT_ID="your_client_id"
supabase secrets set SLACK_CLIENT_SECRET="your_client_secret"
supabase secrets set SLACK_SIGNING_SECRET="your_signing_secret"

# Note: SLACK_BOT_TOKEN is NOT set globally here —
# it is saved per workspace automatically during OAuth install.
# Note: BLOOM_API_KEY is NOT set globally here —
# each workspace enters their own key during setup.

# 5. Deploy functions
supabase functions deploy slack-oauth     --no-verify-jwt
supabase functions deploy slack-setup     --no-verify-jwt
supabase functions deploy slack-events    --no-verify-jwt
supabase functions deploy openai-agent    --no-verify-jwt
supabase functions deploy run-generation  --no-verify-jwt

# 6. Update Slack App URLs (api.slack.com → your app)
# OAuth Redirect URL:       https://YOUR_REF.supabase.co/functions/v1/slack-oauth
# Event Subscriptions URL:  https://YOUR_REF.supabase.co/functions/v1/slack-events
# Interactivity URL:        https://YOUR_REF.supabase.co/functions/v1/slack-events
# Slash Command URL:        https://YOUR_REF.supabase.co/functions/v1/slack-events

# 7. Install the Slack app to your workspace
# api.slack.com/apps → your app → OAuth & Permissions → Install to Workspace
# After install → check your Slack DMs for the Bloom setup link
# Click the link → enter your Bloom API key → select brand → done

# 8. Test it
# Go to any Slack channel and type:
# @Bloom create a summer sale banner for Instagram`,
      },
      {
        label: "Tool Calling",
        language: "typescript",
        code: `// GPT-4o with tool calling decides when to generate
const tools = [{
  type: 'function',
  function: {
    name: 'generate_images',
    description: 'Generate on-brand images for one or more platforms',
    parameters: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        generations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              prompt: { type: 'string' },
              aspect_ratio: {
                type: 'string',
                enum: ['1:1', '4:5', '9:16', '16:9']
              },
              platform: { type: 'string' },
              variants: { type: 'number' }
            }
          }
        }
      }
    }
  }
}];

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: conversationHistory,
  tools,
  tool_choice: 'required',
});

const toolCall = response.choices[0].message.tool_calls?.[0];
const args = JSON.parse(toolCall?.function.arguments ?? '{}');`,
      },
      {
        label: "Generate",
        language: "typescript",
        code: `async function generateBloomImage(
  apiKey: string,
  brandSessionId: string,
  prompt: string,
  aspectRatio: string,
  variants = 2
) {
  // Start generation
  const { data: gen } = await fetch(
    'https://www.trybloom.ai/api/v1/images/generations',
    {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        brandSessionId,
        aspectRatio,
        imageSize: '2K',
        model: 'fast',
        variantCount: variants,
        referenceImageIds: [],
      }),
    }
  ).then(r => r.json());

  // Poll until ready
  const { data } = await fetch(
    \`https://www.trybloom.ai/api/v1/images?ids=\${gen.ids.join(',')}&wait=true&timeout=120&includeUrls=true\`,
    { headers: { 'x-api-key': apiKey } }
  ).then(r => r.json());

  return data.images;
}`,
      },
    ],
  },
  {
    slug: "figma-plugin",
    category: "Design Tools",
    title: "Figma Plugin",
    description:
      "Generate on-brand images inside Figma and insert to canvas in one click",
    longDescription:
      "A published Figma Community plugin that lets designers generate on-brand images without ever leaving the editor. Select a frame, type a prompt, and images appear directly on your canvas with smart layer naming, batch fill, and style reference support.",
    integrationEmoji: "🎨",
    integrationName: "Figma",
    tags: ["TypeScript", "Figma API", "Webpack"],
    difficulty: "Intermediate",
    setupTime: "10 min",
    githubUrl: "https://github.com/Guru6163/bloom",
    whatItDoes: [
      "Auto-detects selected frame dimensions and maps to aspect ratio",
      "Generate 1-4 image variants per prompt",
      "Insert directly onto canvas with smart layer naming",
      "Replace existing image layers in one click",
      "Batch fill multiple selected frames simultaneously",
      "Use any canvas image as a visual style reference",
    ],
    tabs: [
      {
        label: "Setup",
        language: "bash",
        code: `git clone https://github.com/Guru6163/bloom
cd bloom
npm install
npm run build
# In Figma Desktop:
# Plugins → Development → Import plugin from manifest
# Select manifest.json`,
      },
      {
        label: "Generate",
        language: "typescript",
        code: `// Called from plugin UI (ui.html)
async function generateImages(
  apiKey: string,
  brandSessionId: string,
  prompt: string,
  aspectRatio: string,
  variants: number
): Promise<string[]> {
  const res = await fetch(
    'https://www.trybloom.ai/api/v1/images/generations',
    {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        brandSessionId,
        aspectRatio,
        imageSize: '2K',
        model: 'fast',
        variantCount: variants,
        referenceImageIds: [],
      }),
    }
  );
  const { data } = await res.json();
  return data.ids;
}`,
      },
      {
        label: "Insert to Canvas",
        language: "typescript",
        code: `// Runs in code.ts — Figma Plugin API sandbox
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'INSERT_IMAGE') {
    const response = await fetch(msg.imageUrl);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const image = figma.createImage(bytes);

    const rect = figma.createRectangle();
    rect.resize(msg.frameWidth, msg.frameHeight);
    rect.fills = [{
      type: 'IMAGE',
      imageHash: image.hash,
      scaleMode: 'FILL',
    }];
    rect.name = \`Bloom: \${msg.prompt.slice(0, 40)} · \${msg.aspectRatio}\`;

    const frame = figma.currentPage.selection[0] as FrameNode;
    frame.appendChild(rect);
    figma.notify('✓ Image inserted', { timeout: 2000 });
  }
};`,
      },
    ],
  },
  {
    slug: "canva-app",
    category: "Design Tools",
    title: "Canva App",
    description:
      "Generate on-brand images inside Canva and add to any design instantly",
    longDescription:
      "A native Canva App that brings Bloom's brand-matched generation directly into the Canva editor. Connects your Bloom brand once, then generates and inserts images without ever switching tabs. Submitted to the Canva Apps Marketplace.",
    integrationEmoji: "🖼️",
    integrationName: "Canva",
    tags: ["TypeScript", "React", "Canva SDK"],
    difficulty: "Intermediate",
    setupTime: "20 min",
    githubUrl: "https://github.com/Guru6163/bloom-canva",
    whatItDoes: [
      "Native Canva side panel — zero tab switching",
      "Connect your Bloom account once with API key",
      "Select brand, type prompt, choose aspect ratio",
      "Generated image inserts directly onto the design canvas",
      "Prompt history and templates for quick reuse",
      "Works across all Canva design types",
    ],
    tabs: [
      {
        label: "Setup",
        language: "bash",
        code: `git clone https://github.com/Guru6163/bloom-canva
cd bloom-canva
npm install
echo "CANVA_APP_ID=YOUR_APP_ID" > .env
npm start
# App runs at https://localhost:8080
# In Canva Developer Portal:
# Set Development URL → https://localhost:8080`,
      },
      {
        label: "Insert to Canvas",
        language: "typescript",
        code: `import { upload } from '@canva/asset';
import { addNativeElement } from '@canva/design';

// Upload Bloom image URL to Canva CDN
// then insert onto the current canvas
async function insertToCanvas(imageUrl: string) {
  const result = await upload({
    type: 'IMAGE',
    mimeType: 'image/jpeg',
    url: imageUrl,
    thumbnailUrl: imageUrl,
  });

  await addNativeElement({
    type: 'IMAGE',
    ref: result.ref,
  });
}`,
      },
      {
        label: "Full Component",
        language: "typescript",
        code: `export function App() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const brandSessionId = resolveBrandSessionId(brand);
      const ids = await generateImages(
        apiKey, brandSessionId, prompt, aspectRatio, variants
      );
      const images = await pollImages(apiKey, ids);
      setResults(images.map(getImageUrl).filter(Boolean));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding="2u">
      <MultilineInput value={prompt} onChange={setPrompt} />
      <Button variant="primary" onClick={handleGenerate} loading={loading}>
        Generate 🔥
      </Button>
      {results.map(url => (
        <img key={url} src={url}
          onClick={() => insertToCanvas(url)}
          style={{ cursor: 'pointer', width: '100%' }}
        />
      ))}
    </Box>
  );
}`,
      },
    ],
  },
  {
    slug: "batch-campaign-generator",
    category: "Automation",
    title: "Batch Campaign Generator",
    description:
      "Upload a CSV of products → generate images for every platform → download as ZIP",
    longDescription:
      "For agencies and e-commerce teams managing large product catalogs. Import products via CSV upload, Shopify store URL, or manual entry. Bloom generates on-brand images for every product and every platform concurrently, then packages them as a download-ready ZIP.",
    integrationEmoji: "⚡",
    integrationName: "REST API",
    tags: ["TypeScript", "React", "JSZip", "Shopify"],
    difficulty: "Beginner",
    setupTime: "2 min",
    githubUrl: "https://bloombulkgen.ragnostic.in",
    demoUrl: "https://bloombulkgen.ragnostic.in",
    whatItDoes: [
      "Import via CSV upload, Shopify store URL, or manual entry",
      "Select platforms: Instagram, Meta Ads, Stories, LinkedIn, Hero",
      "5 concurrent generation threads for maximum speed",
      "Live progress grid fills in as each image completes",
      "Download all as organized ZIP: /product/platform/variant.jpg",
      "Campaign history saved so nothing gets lost",
    ],
    tabs: [
      {
        label: "Concurrency",
        language: "typescript",
        code: `// Run N tasks with max concurrency
async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  maxConcurrent: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const p = task().then(result => {
      results.push(result);
      executing.splice(executing.indexOf(p as any), 1);
    });
    executing.push(p as any);
    if (executing.length >= maxConcurrent) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

// Generate for all products × platforms
const tasks = products.flatMap(product =>
  platforms.map(platform => () =>
    generateBloomImage(
      apiKey, brandSessionId,
      \`\${product.name}. \${product.description}\`,
      platform.aspectRatio
    )
  )
);

const results = await runWithConcurrency(tasks, 5);`,
      },
      {
        label: "Shopify Import",
        language: "typescript",
        code: `// Import all products from any public Shopify store
async function importFromShopify(storeUrl: string) {
  const domain = storeUrl
    .replace(/^https?:\\/\\//, '')
    .replace(/\\/$/, '');

  const res = await fetch(
    \`https://\${domain}/products.json?limit=250\`
  );
  const { products } = await res.json();

  return products.map((p: any) => ({
    name: p.title,
    description: p.body_html
      ?.replace(/<[^>]*>/g, '') ?? '',
    price: p.variants[0]?.price ?? '',
    category: p.product_type ?? '',
  }));
}`,
      },
      {
        label: "ZIP Download",
        language: "typescript",
        code: `import JSZip from 'jszip';

async function downloadCampaignZip(
  name: string,
  results: GenerationResult[]
) {
  const zip = new JSZip();

  for (const result of results) {
    const folder = zip
      .folder(result.productName)
      ?.folder(result.platform);

    const res = await fetch(result.imageUrl);
    const blob = await res.blob();
    folder?.file(\`variant-\${result.index + 1}.jpg\`, blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  Object.assign(document.createElement('a'), {
    href: url,
    download: \`\${name}-campaign.zip\`,
  }).click();
}`,
      },
    ],
  },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}
