Research|META: Building a NeoCloud and Continuing to Rent Capacity are not Contradictory
JUL 01,2026 ·PAID
Share
Pre-market this morning, news reported that Meta is considering commercializing its surplus AI compute externally, potentially building it into a NeoCloud-style business. The market's first reaction was sharp: Meta rose nearly 6% pre-market, while AI compute and NeoCloud-related names took a hit from the negative narrative. The wory is simple: if Meta also starts selling GPU compute externally, does that directly cause a compute glut?
The reaction is understandable, but we think the market has oversimplified the question.
First, this is not about “AI compute demand peaking” or “Meta no longer needing to buy compute.” On the contrary, Meta is still locking in very large amounts of new compute at the same time. Per Bloomberg/Reuters, Meta recently signed a new AI computing capacity agreement with Crusoe, taking roughly 1.6 GW of combined capacity from two Crusoe data centers in Childress, Texas,and Warrenton, Missouri.
Meta is also still buying compute from other NeoClouds. In our 3Q25 META Preview last year, we noted that Meta was seeking to purchase 3 GW of compute capacity from NeoClouds.
Just a week ago, there was also news that GCP was throttling Meta's compute resources because Meta's consumption had exceeded expectatins.
So,on the surface, there does seem to be a contradiction: if Meta already has surplus compute, why keep renting 1.6 GW from Crusoe?
Our read is that this is not a contradiction. It is a generational shift in compute.
Over the past two years, Meta has bought and deployed large quantities of H100/H200. These GPUs are far from worthless. On the contrary, they remain highly valuable for inference, fine-tuning, enterprise model serving, image/video generation, and traditional ML workloads. But for next-generation frontier model training, especially 3T+ parameter MoE,long context, multimodal, and RL-heavy post-training, the training economics of H100/H200 decline noticeably.
![001_p001_00.jpg](figures/001_p001_00.jpg)

The point is not that the H100 cannot train. It is that the cost per effective token rises meaningfully.
Once models cross the 3T+ threshold,the bottleneck is no longer just single-chip FLOPS. It becomes HBM capacity/bandwidth, GPU-to-GPU communication, the scale-up network, checkpoint/restart, expert routing, sequence parallelism, pipeline bubbles,and large-scale collective communication. An H10o cluster can, of course, still run, but the training wall-clock time is longer, communication overhead is higher, and cluster utilization is harder to sustain. The net result is that to train the same frontier model, H100 trails GB200/GB300 on both cost and time,and will trail Vera Rubin by an even wider margin.
Meta now faces a fairly classic asset-allocation problem: The most advanced GB200/GB300/Rubin should be reserved first for next-generation model training; the prior-generation H10o/H200 should be shifted as far as possible toward inference or external commercial monetization. This is exactly why “building a NeoCloud” and "continuing to rent 1.6GW from Crusoe” can coexist.
Meta's continued 1.6 GW lock-in with Crusoe is fundamentally a preparation for longer-term, more advanced,larger-scale AI infrastructure. For Meta, this capacity is strategic supply for the coming GB200/GB300/Rubin era rather than a simple patch for an H100 shortfall.
On the other side,having already bought large quantities of H100/H200, Meta will not let those assets sit idle once frontier training moves to the next generation. Meta of course runs plenty of internal inference workloads across ads, recommendations, and content ranking, but that is not quite the OpenAI/Anthropic model of selling tokens directly to external customers via LLM inference. If Meta lacks enough external token demand it can monetize directly, turning H100/H200 into cloud capacity or a hosted model API for external sale is a very reasonable way to recycle capital.
This actually aligns with the logic of xAI/SpaceX. xAI publicly announced a compute partnership with Anthropic this year, supplying Anthropic with Colossus 1 compute;

xAI states that Colossus 1 contains more than 220,000 NVIDIA GPUs, including H100, H200,and GB200,and can support training, fine-tuning, inference, and HPC workloads. This shows that even frontier AI companies may rent out part of an existing GPU fleet while keeping the newest, scarcest, most training-effcient next-generation clusters for their own frontier models.
So today's worry that “Meta entering NeoCloud willcrush every NeoCloud" strikes us as overdone.
A more accurate read: the AI compute market is moving from a single GPU shortage into a phase of multi-generation, tiered pricing and tiered usage.
The first tier is the newest training compute: GB300, Rubin, and later systems with even larger scale-up domains, serving mainly frontier model training. Supply here remains scarce,and customers will continue to lock in capacity with Crusoe, CoreWeave, Nebius, Oracle,Microsoft,and other suppliers.
The second tier is prior-generation high-end compute: H100/H200 and some GB200, better suited to inference, fine-tuning, enterprise AI, hosted models,agent workloads, and small- to mid-model training. Demand here has not disappeared; it has shifted from“the scarcest training resource” to“an inference resource that can be commercialized at scale."
The third tier is more general-purpose GPU cloud and long-tail enterprise workloads, more price-sensitive but also more elastic in demand.
Within this framework, Meta's move is quite rational: it is not halting AI infrastructure buildout, but placing different GPU generations into their best-fit economic uses.
So we do not see this as a major problem for AI infrastructure. The judgment that really matters: demand for next-generation frontier model training for GB200/GB300/Rubin remains very strong; at the same time, prior-generation GPUs like H100/H200 will not be scrapped but will shift to inference monetization and external compute sales.
The implication for the whole AI supply chain is,if anything,the opposite of the bearish read: the GPU fleet is becoming a multi-generation asset rather than a singleuse training tool. Old GPUs do not reach zero, and new GPUs remain scarce. Meta

building a NeoCloud is not a sign that demand has collapsed. We believe it is a sign that compute assets are finally being financialized and commercialized.
3 Likes
Discussion about this post
CommentsRestacks
Write a comment...
@ 2026 FundaAl · Privacy. · Terms · Collection notice Substack is the home for great culture
![002_p004_01.jpg](figures/002_p004_01.jpg)
![003_p004_02.jpg](figures/003_p004_02.jpg)
