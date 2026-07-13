# Complete USD Business Model v3

Research and calculation date: 13 July 2026

This version supersedes the previous profit tables. All prices and costs are in USD.

## Final technology decision

### Free API availability

Free AI APIs exist:

- Gemini has a free tier.
- Groq has free-plan limits for several models.
- OpenRouter offers free models.

They should be used for development and automated testing only—not as the production dependency. Gemini’s pricing page states that free-tier content may be used to improve Google products, while paid-tier content is not. OpenRouter states that its free models have low limits and are usually unsuitable for production. Free capacity can also return rate-limit or availability errors.

### Production n8n API

Use **paid Gemini 2.5 Flash-Lite** in n8n.

Published paid price:

- $0.10 per million input tokens.
- $0.40 per million output tokens.

The model assumes:

- Average four-minute customer conversation.
- Three n8n AI jobs per conversation: structured summary, intent/outcome classification and message/notification preparation.
- 2,000 input tokens and 300 output tokens per job.
- 5% additional QA/test processing.

The resulting monthly n8n AI cost is:

| Package | Estimated n8n AI jobs | Monthly API cost |
|---|---:|---:|
| Pilot | 236.25 | $0.0756 |
| Launch | 787.50 | $0.2520 |
| Growth | 1,968.75 | $0.6300 |
| Scale | 4,725.00 | $1.5120 |
| Enterprise | 11,812.50 | $3.7800 |

Groq Llama 3.1 8B is cheaper at $0.05 per million input and $0.08 per million output tokens and supports JSON/tool use. It can be retained as an optional fallback for simple classification. Gemini Flash-Lite is selected as primary because this product needs stronger multilingual and mixed-language performance and already uses Google’s AI stack.

## Twilio profile included in the package

The base business model includes:

- One US local Twilio number: $1.15 per month.
- Inbound US local calling: $0.0085 per minute.
- All package AI minutes plus 5% QA/test minutes.

It does not include call recording, transcription, branded calling, SMS, WhatsApp, toll-free calling or international outbound calling.

## Final USD pricing and profit

Operating profit is after direct delivery cost, Stripe collection, 10% sales/customer-acquisition allocation and 8% corporate overhead.

| Package | AI minutes | Setup fee | Setup COGS | Setup operating profit | Setup margin | Monthly fee | Monthly COGS | Monthly operating profit | Monthly operating margin |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Pilot | 300 | $1,000.00 | $509.37 | **$281.33** | 28.13% | $397.00 | $157.03 | **$156.69** | 39.47% |
| Launch | 1,000 | $2,500.00 | $1,048.77 | **$928.43** | 37.14% | $697.00 | $271.44 | **$279.58** | 40.11% |
| Growth | 2,500 | $5,000.00 | $2,047.87 | **$1,906.83** | 38.14% | $1,297.00 | $556.38 | **$469.24** | 36.18% |
| Scale | 6,000 | $10,000.00 | $4,543.28 | **$3,366.43** | 33.66% | $2,997.00 | $1,079.20 | **$1,291.13** | 43.08% |
| Enterprise | 15,000 | $20,000.00 | $9,569.29 | **$6,250.42** | 31.25% | $5,997.00 | $2,496.67 | **$2,246.65** | 37.46% |

## Monthly direct-cost detail

| Package | ElevenLabs | Zara LLM | Core infrastructure | n8n AI | Twilio | Support labor | Vendor reserve | Total direct COGS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Pilot | $25.20 | $0.3780 | $74.36 | $0.0756 | $3.8275 | $48.00 | $5.1921 | **$157.0332** |
| Launch | $99.00 | $1.2600 | $79.36 | $0.2520 | $10.0750 | $72.00 | $9.4974 | **$271.4444** |
| Growth | $299.00 | $3.1500 | $89.36 | $0.6300 | $23.4625 | $120.00 | $20.7801 | **$556.3826** |
| Scale | $503.96 | $7.5600 | $208.65 | $1.5120 | $54.7000 | $264.00 | $38.8191 | **$1,079.2011** |
| Enterprise | $1,260.00 | $18.9000 | $388.65 | $3.7800 | $135.0250 | $600.00 | $90.3178 | **$2,496.6728** |

Core infrastructure contains the allocated Supabase, n8n Cloud, Vercel, transactional email, domain and monitoring costs.

The monthly operating profit calculation additionally deducts:

- Stripe: 2.9% plus $0.30.
- Sales/CAC: 10% of revenue.
- Corporate overhead: 8% of revenue.

## Setup scope and Twilio work

Twilio implementation adds number provisioning, routing, ElevenLabs/SIP connection, webhook configuration, caller-ID behavior, failure handling, transfer rules and PSTN testing.

| Package | Original setup hours | Twilio hours | Final setup hours | Direct setup COGS | Setup fee | Operating profit |
|---|---:|---:|---:|---:|---:|---:|
| Pilot | 33 | 3 | 36 | $509.37 | $1,000.00 | **$281.33** |
| Launch | 65 | 5 | 70 | $1,048.77 | $2,500.00 | **$928.43** |
| Growth | 120 | 8 | 128 | $2,047.87 | $5,000.00 | **$1,906.83** |
| Scale | 225 | 15 | 240 | $4,543.28 | $10,000.00 | **$3,366.43** |
| Enterprise | 450 | 25 | 475 | $9,569.29 | $20,000.00 | **$6,250.42** |

Setup COGS includes labor, AI test minutes, Twilio test minutes, systems, data/security preparation, training/travel where required and a 10% implementation reserve.

## First-year economics per client

| Package | First-year revenue | Setup profit | 12-month recurring profit | Total first-year operating profit | First-year operating margin |
|---|---:|---:|---:|---:|---:|
| Pilot | $5,764.00 | $281.33 | $1,880.33 | **$2,161.66** | 37.50% |
| Launch | $10,864.00 | $928.43 | $3,354.99 | **$4,283.42** | 39.42% |
| Growth | $20,564.00 | $1,906.83 | $5,630.93 | **$7,537.76** | 36.66% |
| Scale | $45,964.00 | $3,366.43 | $15,493.51 | **$18,859.94** | 41.03% |
| Enterprise | $91,964.00 | $6,250.42 | $26,959.85 | **$33,210.27** | 36.11% |

## Twilio country sensitivity

| Package | Billable minutes with QA | US inbound | US outbound | Pakistan landline outbound | Pakistan mobile outbound |
|---|---:|---:|---:|---:|---:|
| Pilot | 315 | $3.83 | $5.56 | $49.98 | $57.85 |
| Launch | 1,050 | $10.08 | $15.85 | $163.90 | $190.15 |
| Growth | 2,625 | $23.46 | $37.90 | $408.03 | $473.65 |
| Scale | 6,300 | $54.70 | $89.35 | $977.65 | $1,135.15 |
| Enterprise | 15,750 | $135.03 | $221.65 | $2,442.40 | $2,836.15 |

If Pakistan mobile outbound Twilio usage were absorbed without changing package prices, operating profit would become:

| Package | Normal US-inbound operating profit | Profit after absorbing Pakistan mobile rate |
|---|---:|---:|
| Pilot | $156.69 | $99.97 |
| Launch | $279.58 | $90.50 |
| Growth | $469.24 | **-$3.45 loss** |
| Scale | $1,291.13 | $156.65 |
| Enterprise | $2,246.65 | **-$589.53 loss** |

Therefore, Pakistan outbound calling must be billed as usage at cost plus administration or provided through a negotiated local SIP/BYOC carrier. It cannot safely be hidden inside the fixed package.

## Complete inclusion list

Included in the fixed package:

- ElevenLabs Agents subscription, AI minutes and overage.
- Gemini used by Zara.
- Paid Gemini 2.5 Flash-Lite used by n8n.
- Supabase production database/auth/storage allocation.
- n8n Cloud executions.
- Vercel production deployment.
- Transactional email allocation.
- Domain and SSL allocation.
- Monitoring and incident allocation.
- One US Twilio local number.
- US inbound Twilio minutes matching the package allowance plus QA reserve.
- Monthly QA, support, optimization and reporting labor.
- Payment collection, sales/CAC and overhead.

Not included:

- Pakistan or other international outbound carrier usage.
- Toll-free rates.
- Twilio call recording/transcription and advanced add-ons.
- SMS or WhatsApp.
- Client POS/CRM/reservation-platform subscription fees.
- Customer order-payment gateway fees.
- Taxes, withholding, refunds and bad debt.
- Work beyond the contracted integration/change allowance.

## Final recommendation

- Use paid Gemini 2.5 Flash-Lite for production n8n workflows.
- Keep the free Gemini or Groq tier for development/testing only.
- Include US inbound Twilio in global packages.
- Pass international and Pakistan outbound telephony through separately.
- Sell Growth at $5,000 setup plus $1,297/month.
- Use Scale as the primary multi-location offer at $10,000 setup plus $2,997/month.

## Official sources

- Gemini pricing: https://ai.google.dev/gemini-api/docs/pricing
- Gemini rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- Groq Llama 3.1 8B: https://console.groq.com/docs/model/llama-3.1-8b-instant
- OpenRouter free-tier limitations: https://openrouter.ai/docs/faq
- Twilio US Voice: https://www.twilio.com/en-us/voice/pricing/us
- Twilio Pakistan Voice: https://www.twilio.com/voice/pricing/pk
- ElevenLabs Agents: https://elevenlabs.io/pricing/agents
- Supabase: https://supabase.com/pricing
- n8n: https://n8n.io/pricing/
- Vercel: https://vercel.com/pricing
- Resend: https://resend.com/pricing
- Stripe: https://stripe.com/pricing

