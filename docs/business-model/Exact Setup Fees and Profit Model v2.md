# Exact Setup Fees and Profit Model v2

> Superseded by `Complete USD Business Model v3.md` and `AI_Voice_Agent_Complete_USD_Model_v3.xlsx`, which add paid n8n AI processing and Twilio.

Research and calculation date: 13 July 2026

## Meaning of “exact”

The figures below are exact outputs from a declared operating model—not promises that a future invoice cannot change. No agency can state the true profit to the rupee before it knows actual payroll, client support usage, payment method, tax, telephony country, refunds, and vendor invoices.

This model includes the costs agencies commonly omit:

- ElevenLabs plan and overage.
- Gemini LLM usage.
- Supabase, n8n, Vercel, email, domain and monitoring allocation.
- 5% additional AI usage for ongoing QA/testing.
- 5% vendor/foreign-exchange reserve.
- Direct monthly support and QA labor.
- Setup discovery, conversation design, integrations, testing, training and project management.
- Payment collection.
- 10% sales/customer-acquisition allocation.
- 8% corporate overhead allocation.

It excludes telephone carrier usage, SMS/WhatsApp fees, taxes and bad debt. Those must be passed through or added to a client-specific quotation.

## Fixed model inputs

| Input | Model value |
|---|---:|
| USD/PKR | 280 |
| Fully loaded delivery cost | $12/hour |
| ElevenLabs extra minute | $0.08 |
| Gemini agent planning cost | $0.0012/minute |
| Production QA minutes | 5% above client allowance |
| Vendor/FX reserve | 5% of technical cost |
| Global card collection | 2.9% + $0.30 |
| Pakistan invoice/bank collection | 1% |
| Sales/CAC allocation | 10% of revenue |
| Corporate overhead | 8% of revenue |
| Setup contingency | 10% of setup delivery cost |

The $12/hour labor rate is the agency’s fully loaded internal delivery cost, not the client billing rate. It corresponds to PKR 3,360 per productive hour or PKR 537,600 for 160 productive hours. If the actual team costs more, the workbook assumption must be changed before quoting.

## Final one-time setup fees

| Scenario | AI allowance | Global setup fee | Pakistan setup fee | Delivery hours |
|---|---:|---:|---:|---:|
| Pilot | 300 minutes | $1,000 | PKR 250,000 | 33 |
| Launch | 1,000 minutes | $2,500 | PKR 600,000 | 65 |
| Growth | 2,500 minutes | $5,000 | PKR 1,200,000 | 120 |
| Scale | 6,000 minutes | $10,000 | PKR 2,500,000 | 225 |
| Enterprise | 15,000 minutes | $20,000 | PKR 5,000,000 | 450 |

The setup fee is charged with the first month in advance. Fifty percent is due at contract signature and fifty percent before production launch. Any new POS/CRM integration not included in the signed scope is a change request.

## What setup includes

| Workstream | Pilot | Launch | Growth | Scale | Enterprise |
|---|---:|---:|---:|---:|---:|
| Discovery and process mapping | 3 h | 5 h | 8 h | 15 h | 25 h |
| Conversation design and knowledge base | 8 h | 16 h | 28 h | 50 h | 90 h |
| Order/reservation/CRM integrations | 6 h | 14 h | 30 h | 60 h | 130 h |
| Dashboard and production configuration | 3 h | 6 h | 12 h | 25 h | 50 h |
| QA, adversarial conversations and regression tests | 8 h | 14 h | 24 h | 40 h | 80 h |
| Client training and launch | 2 h | 4 h | 8 h | 15 h | 30 h |
| Project management and documentation | 3 h | 6 h | 10 h | 20 h | 45 h |
| **Total** | **33 h** | **65 h** | **120 h** | **225 h** | **450 h** |

## Exact global setup profit

Operating profit is after delivery COGS, card collection, sales/CAC and overhead.

| Scenario | Setup fee | Direct setup COGS | Payment | Sales/CAC | Overhead | Operating profit | Margin |
|---|---:|---:|---:|---:|---:|---:|---:|
| Pilot | $1,000.00 | $467.57 | $29.30 | $100.00 | $80.00 | **$323.13** | **32.31%** |
| Launch | $2,500.00 | $979.17 | $72.80 | $250.00 | $200.00 | **$998.04** | **39.92%** |
| Growth | $5,000.00 | $1,936.33 | $145.30 | $500.00 | $400.00 | **$2,018.37** | **40.37%** |
| Scale | $10,000.00 | $4,334.66 | $290.30 | $1,000.00 | $800.00 | **$3,575.04** | **35.75%** |
| Enterprise | $20,000.00 | $9,219.32 | $580.30 | $2,000.00 | $1,600.00 | **$6,600.38** | **33.00%** |

## Exact Pakistan setup profit

| Scenario | Setup fee | Direct setup COGS | Collection | Sales/CAC | Overhead | Operating profit | Margin |
|---|---:|---:|---:|---:|---:|---:|---:|
| Pilot | PKR 250,000 | PKR 130,918 | PKR 2,500 | PKR 25,000 | PKR 20,000 | **PKR 71,582** | **28.63%** |
| Launch | PKR 600,000 | PKR 274,166 | PKR 6,000 | PKR 60,000 | PKR 48,000 | **PKR 211,834** | **35.31%** |
| Growth | PKR 1,200,000 | PKR 542,172 | PKR 12,000 | PKR 120,000 | PKR 96,000 | **PKR 429,828** | **35.82%** |
| Scale | PKR 2,500,000 | PKR 1,213,705 | PKR 25,000 | PKR 250,000 | PKR 200,000 | **PKR 811,295** | **32.45%** |
| Enterprise | PKR 5,000,000 | PKR 2,581,410 | PKR 50,000 | PKR 500,000 | PKR 400,000 | **PKR 1,468,590** | **29.37%** |

Pakistan setup prices should not be reduced further unless the scope is reduced. Dollar-denominated platforms, engineering time, testing and opportunity cost remain real even when the customer pays in PKR.

## Final monthly prices

| Scenario | AI allowance | Global monthly | Pakistan monthly | Approx. 4-minute conversations |
|---|---:|---:|---:|---:|
| Pilot | 300 | $397 | PKR 99,000 | 75 |
| Launch | 1,000 | $697 | PKR 149,000 | 250 |
| Growth | 2,500 | $1,297 | PKR 299,000 | 625 |
| Scale | 6,000 | $2,997 | PKR 699,000 | 1,500 |
| Enterprise | 15,000 | $5,997 | PKR 1,400,000 | 3,750 |

## Exact global monthly profit

| Scenario | Revenue | Direct COGS | Gross profit | Gross margin | Payment | Sales/CAC | Overhead | Operating profit | Operating margin |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Pilot | $397.00 | $152.93 | $244.07 | 61.48% | $11.81 | $39.70 | $31.76 | **$160.79** | **40.50%** |
| Launch | $697.00 | $260.60 | $436.40 | 62.61% | $20.51 | $69.70 | $55.76 | **$290.43** | **41.67%** |
| Growth | $1,297.00 | $531.09 | $765.91 | 59.05% | $37.91 | $129.70 | $103.76 | **$494.54** | **38.13%** |
| Scale | $2,997.00 | $1,020.18 | $1,976.82 | 65.96% | $87.21 | $299.70 | $239.76 | **$1,350.15** | **45.05%** |
| Enterprise | $5,997.00 | $2,350.93 | $3,646.07 | 60.80% | $174.21 | $599.70 | $479.76 | **$2,392.40** | **39.89%** |

## Exact Pakistan monthly profit

| Scenario | Revenue | Direct COGS | Gross profit | Gross margin | Collection | Sales/CAC | Overhead | Operating profit | Operating margin |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Pilot | PKR 99,000 | PKR 42,822 | PKR 56,178 | 56.75% | PKR 990 | PKR 9,900 | PKR 7,920 | **PKR 37,368** | **37.75%** |
| Launch | PKR 149,000 | PKR 72,968 | PKR 76,032 | 51.03% | PKR 1,490 | PKR 14,900 | PKR 11,920 | **PKR 47,722** | **32.03%** |
| Growth | PKR 299,000 | PKR 148,704 | PKR 150,296 | 50.27% | PKR 2,990 | PKR 29,900 | PKR 23,920 | **PKR 93,486** | **31.27%** |
| Scale | PKR 699,000 | PKR 285,650 | PKR 413,350 | 59.13% | PKR 6,990 | PKR 69,900 | PKR 55,920 | **PKR 280,540** | **40.13%** |
| Enterprise | PKR 1,400,000 | PKR 658,260 | PKR 741,740 | 52.98% | PKR 14,000 | PKR 140,000 | PKR 112,000 | **PKR 475,740** | **33.98%** |

## Monthly direct COGS detail

| Scenario | ElevenLabs configuration | ElevenLabs | Gemini | Infrastructure plus monitoring | Support labor | Direct COGS |
|---|---|---:|---:|---:|---:|---:|
| Pilot | Creator + overage, 315 production/test min | $25.20 | $0.38 | $74.36 | $48.00 | $152.93 |
| Launch | Pro, 1,050 production/test min | $99.00 | $1.26 | $79.36 | $72.00 | $260.60 |
| Growth | Scale, 2,625 production/test min | $299.00 | $3.15 | $89.36 | $120.00 | $531.09 |
| Scale | Scale + overage, 6,300 production/test min | $503.96 | $7.56 | $208.65 | $264.00 | $1,020.18 |
| Enterprise | Business + overage, 15,750 production/test min | $1,260.00 | $18.90 | $388.65 | $600.00 | $2,350.93 |

Direct COGS includes an additional 5% reserve on technical vendor costs after the line items above. This is why the displayed components do not simply sum to the final COGS without the reserve.

## Why the Scale tier uses Scale plus overage

At 6,300 production-and-test minutes:

- Scale plan: $299 + 2,562 overage minutes × $0.08 = $503.96.
- Business plan: $990 before LLM usage.

Scale plus overage saves $486.04 per client per month while the Scale plan’s 30-call concurrency is sufficient for most restaurant groups. The client moves to Business only when measured concurrency, volume or workspace-seat requirements justify it.

## Usage and overage rules

- Allowances cover AI connection minutes, not PSTN carrier minutes.
- Warn at 70%, 85% and 100%.
- Continue service rather than stopping critical calls.
- Charge client overage at $0.25 Pilot, $0.22 Launch, $0.20 Growth, $0.18 Scale and negotiated Enterprise pricing.
- Telephony, SMS and WhatsApp are itemized pass-through plus 15% administration.
- Automatically recommend the next tier after two months above 120% utilization.

## Commercial conclusion

Use **Launch** as the smallest normal commercial plan. Pilot is time-limited validation only.

For global clients, the preferred mid-market offer is Growth: **$5,000 setup plus $1,297/month**. Under this fully loaded model, the setup produces $2,018.37 operating profit and the recurring service produces $494.54 operating profit monthly.

For Pakistan, Growth should be **PKR 1,200,000 setup plus PKR 299,000/month**. It produces PKR 429,828 setup operating profit and PKR 93,486 recurring monthly operating profit.

Scale produces the strongest recurring economics because volume is large enough to create client value while the platform can still use the Scale plan plus overage efficiently.

## Research anchors

- ElevenLabs Agents public pricing: https://elevenlabs.io/pricing/agents
- ElevenLabs billing and half-price setup testing: https://help.elevenlabs.io/hc/en-us/articles/29298065878929-How-much-does-ElevenAgents-cost
- Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing
- Supabase pricing: https://supabase.com/pricing
- n8n execution pricing: https://n8n.io/pricing/
- Vercel pricing: https://vercel.com/pricing
- Resend pricing: https://resend.com/pricing
- Stripe pricing: https://stripe.com/pricing
- Better Stack monitoring: https://betterstack.com/pricing
- ECB EUR/USD reference: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html
- WildRun managed receptionist benchmark: https://wildrunai.com/pricing
- Clutch AI development benchmark: https://clutch.co/developers/artificial-intelligence/pricing
