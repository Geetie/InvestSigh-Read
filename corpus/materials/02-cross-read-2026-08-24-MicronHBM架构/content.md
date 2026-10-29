micron
Evolving Memory Architectures for AI
Raghu Sreeramaneni Fellow, HBM Design Architecture
August 2026
micron

Compute Efficient Frontier Memory central to continuous scaling and improvement in LLM’s
“Language modeling performance improves smoothly as we increase the model size, (M1300) dataset size, and amount of compute used for training. For optimal performance, all three factors must be scaled tandem. Empirical performance has a ower-law relationship each individual factor when not bottlenecked by the other two.”
Kaplan et al, OpenAI
Scaling Laws for Neural Language Models, Kaplan, et al, OpenAI
micron

Memory wall
Memory technology has become a key factor limiting AI system performance
2.5D attached memory
micron
![001_p003_00.jpg](figures/001_p003_00.jpg)
![002_p003_01.jpg](figures/002_p003_01.jpg)

HBM as a compute-memory bridge Innovations turbocharging AI workloads
Energy Efficiency (pJ/bit)
Cube Bandwidth (TB/s)
4Cube 3.5Density (GB)
Major inflections in memory products ahead
▪ Disruptive process and design innovation
Packaging technology - next generation capability
▪ GPU offloading; Advanced D2D PHY
▪ Custom features
micron
![003_p004_00.jpg](figures/003_p004_00.jpg)

High bandwidth memory - Key enabler of AI performance Significant amount of advanced memory Silicon incorporated in leading edge AI platforms
Package with
8 HBM4 instances
GPU vs. memory silicon area (mm2)
Typical GPU Memory (HBM4 12-high)
micron
![004_p005_00.jpg](figures/004_p005_00.jpg)

Why High Bandwidth Memory (HBM)?
Roofline plot identifies compute vs. memory bottlenecks
Maximum Ops (Varies by GPU)
Performance Increasing memory, (Operations bandwidth per Second
Memory Bound: Processors wait for more data to arrive
Compute Bound: Data arrives fast enough to keep all Processors busy
Amount of Work done on a chunk of Data (Operations per Byte)
The model plots attainable performance (OPs) against arithmetic intensity (OPs/byte)
Applications in the red zone are memorybound (where memory bandwidth limits performance), while those in the blue zone are compute-bound (where compute capability limits performance)
HBM elevates the memory bandwidth ceiling, shifting the red zone up, allowing memory intensive AI workloads to achieve higher performance before hitting memory limits
micron

What is HBM?
HBM is the memory powering accelerated computing behind the AI revolution
Core DRAM Die
<table><tr><td>Product</td><td>HBM1</td><td>HBM2</td><td>HBM2E</td><td>HBM3</td><td>HBM3E</td><td>HBM4</td></tr><tr><td>Timeline</td><td>2014</td><td>2018</td><td>2020</td><td>2022</td><td>2024</td><td>2026</td></tr><tr><td># Channels</td><td>8</td><td>8</td><td>8</td><td>16</td><td>16</td><td>32</td></tr><tr><td># Pseudo-Channels (PC)</td><td>-</td><td>16</td><td>16</td><td>32</td><td>32</td><td>64</td></tr><tr><td>PC Width (bits)</td><td>128</td><td>64</td><td>64</td><td>32</td><td>32</td><td>32</td></tr><tr><td>Burst Length</td><td>2</td><td>4</td><td>4</td><td>8</td><td>8</td><td>8</td></tr><tr><td>Prefetch (bits)</td><td>256</td><td>256</td><td>256</td><td>256</td><td>256</td><td>256</td></tr><tr><td>Data I/O&#x27;s</td><td>1024</td><td>1024</td><td>1024</td><td>1024</td><td>1024</td><td>2048</td></tr><tr><td>Nominal Data Rate (Gbps)</td><td>1</td><td>2.4</td><td>3.6</td><td>6.4</td><td>8</td><td>11</td></tr><tr><td>Nominal Bandwidth (GB/s)</td><td>128</td><td>307</td><td>460</td><td>819</td><td>1024</td><td>2800</td></tr><tr><td>DRAM Density (Gb)</td><td>2</td><td>8</td><td>16</td><td>16</td><td>24</td><td>24</td></tr><tr><td>DRAM Stack Height</td><td>4</td><td>4/8</td><td>4/8</td><td>8/12</td><td>8+</td><td>8+</td></tr><tr><td>Cube Capacity (GB)</td><td>1GB</td><td>4/8GB</td><td>8/16GB</td><td>16/24GB</td><td>24GB+</td><td>24GB+</td></tr></table>
Each generation increases: Data Rate → Higher bandwidth Pseudo-Channels → Granular & efficient Density & Stack Height → Larger capacity
micron
![005_p007_00.jpg](figures/005_p007_00.jpg)

HBM – Form Factor
HBM integrated with GPU/Accelerator in a Heterogenous Integrated System – System-In-Package (SiP)
Package Substrate
-BGAballs
PCB
micron
![006_p008_00.jpg](figures/006_p008_00.jpg)

HBM Architecture High parallelism through multiple independent channels
Each DRAM die contains multiple independent channels ⎻ 2 Pseudo-channels per Channel ▪ Shared Command/Address bus, independent data bus HBM3E has 128 banks/die; HBM4 increases to 256 banks/die
Base die interfaces command and data between host & DRAM Microbump PHY connects the host to the base die 3D TSV PHY interconnects the DRAM stack and the base die
Highly dense & short point-to-point connections on interposer 1 K IO on HBM3E, 2K IO on HBM4
Source: Micron (HBM3E)
micron
![007_p009_00.jpg](figures/007_p009_00.jpg)
![008_p009_01.jpg](figures/008_p009_01.jpg)

System Level Memory Bandwidth HBM enables an order of magnitude higher system bandwidth versus DDR DIMMs
Servers have multiple DRAM channels per CPU to maximize memory bandwidth
• Example: 8 channels with DDR5 memory
4800 MT/s, 2x32 bit sub-channels ➢307 GB/s theoretical bandwidth
2 ranks / channel, 64 GB / DIMM ➢1 TB capacity
GPUs maximize bandwidth by using multiple HBM stacks
• Example: 8 HBM3 stacks at 5.2 Gbps
16 channels per stack, 2 x32 bit pseudochannels 5.3 TB/s theoretical bandwidth
• 24GB / stack ➢ 192 GB capacity
HBM
1. CPU: https://www.crucial.com/articles/about-memory/server-memory-and-hardware-compatibility
2. GPU: https://www.amd.com/en/products/accelerators/instinct/mi300/mi300x.html
micron
![009_p010_00.jpg](figures/009_p010_00.jpg)
![010_p010_01.jpg](figures/010_p010_01.jpg)

System Level Memory Bandwidth HBM enables an order of magnitude higher system bandwidth versus DDR DIMMs
Combined overhead from design architecture, advanced packaging, and manufacturing complexity results in ~3X more silicon being consumed for delivering HBM3E capacity relative to DDR5
HBM3E
Core BW @ 8Gbps 256GB/s = 256 IO*8Gbps
Banks
128 banks
DDR5
8GB/s = 8 IO*8Gbps
32 banks
micron
![011_p011_00.jpg](figures/011_p011_00.jpg)
![012_p011_01.jpg](figures/012_p011_01.jpg)

Essential memory parameters to support AI innovation
1
Performance
• Speed and bandwidth
Reliability and fault tolerance
Capacity
Parameters, file and cache
• Scalability
Low power
• Energy efficiency
• AI-enabled edge devices
micron
![013_p012_00.jpg](figures/013_p012_00.jpg)

High Speed Links & SiP Integration
High-speed bandwidth scaling and larger interposers continue driving SiP advancements
Packaging Technology
IO Circuit Design
Interposer Process Technology
CMOS Process Technology
Speed & Bandwidth
Power Efficiency
Thermal Performance
Ideal Transmitted UI
- Transmit Side Loss Read – DRAM side Write - GPU/Host side
Higher speed IO links
• High-speed IO design innovation
• Memory-optimized SERDES D2D PHY
• CPO – Co-Packaged Optics
Larger interposer footprint
• Larger SiP’s ~ CoWoS-L, CoWoS-R, etc
• Glass substrates
CoWoS – Chip-on-Wafer-on-Substrate | SiP – System-In-Package
micron
![014_p013_00.jpg](figures/014_p013_00.jpg)
![015_p013_01.jpg](figures/015_p013_01.jpg)
![016_p013_02.jpg](figures/016_p013_02.jpg)
![017_p013_03.jpg](figures/017_p013_03.jpg)

CPI & RAS – Key Challenges
CPI - Chip-Package-Interactions
PCB
Thermo-Mechanical pressure resulting from Coefficient of Thermal Expansion (CTE) mismatches between various materials used in complex heterogeneously integrated HBM device creates unique challenges
RAS - Reliability-Availability-Serviceability
<table><tr><td>Component</td><td>Category</td><td>Interruption Count</td><td>% of Interruptions</td></tr><tr><td>Faulty GPU</td><td>GPU</td><td>148</td><td>30.1%</td></tr><tr><td>GPU HBM3 Memory</td><td>GPU</td><td>72</td><td>17.2%</td></tr><tr><td>Software Bug</td><td>Dependency</td><td>54</td><td>12.9%</td></tr><tr><td>Network Switch/Cable</td><td>Network</td><td>35</td><td>8.4%</td></tr><tr><td>Host Maintenance</td><td>Unplanned Maintenance</td><td>32</td><td>7.6%</td></tr><tr><td>GPU SRAM Memory</td><td>GPU</td><td>19</td><td>4.5%</td></tr><tr><td>GPU System Processor</td><td>GPU</td><td>17</td><td>4.1%</td></tr><tr><td>NIC</td><td>Host</td><td>7</td><td>1.7%</td></tr><tr><td>NCCL Watchdog Timeouts</td><td>Unknown</td><td>7</td><td>1.7%</td></tr><tr><td>Silent Data Corruption</td><td>GPU</td><td>6</td><td>1.4%</td></tr><tr><td>GPU Thermal Interface + Sensor</td><td>GPU</td><td>6</td><td>1.4%</td></tr><tr><td>SSD</td><td>Host</td><td>3</td><td>0.7%</td></tr><tr><td>Power Supply</td><td>Host</td><td>3</td><td>0.7%</td></tr><tr><td>Server Chassis</td><td>Host</td><td>2</td><td>0.5%</td></tr><tr><td>IO Expansion Board</td><td>Host</td><td>2</td><td>0.5%</td></tr><tr><td>Dependency</td><td>Dependency</td><td>2</td><td>0.5%</td></tr><tr><td>CPU</td><td>Host</td><td>2</td><td>0.5%</td></tr><tr><td>System Memory</td><td>Host</td><td>2</td><td>0.5%</td></tr></table>
Table 5 Root-cause categorization of unexpected interruptions during a 54-day period of Llama 3 405B pre-training. About 78% of unexpected interruptions were attributed to confirmed or suspected hardware issues
Two levels of ECC coverage starting on HBM3:
1. System level coverage – 16 meta bits per 256 bit access – system can deploy CRC or ECC based coverage
2. On-die ECC coverage – symbol based ECC (Reed-Solomon) implemented on-die
The Llama 3 Herd of Models, AI @ Meta, https://ai.meta.com/research/publications/the-llama-3-herd-of-models/
micron
![018_p014_00.jpg](figures/018_p014_00.jpg)

Thermal Challenges
Thermal innovations essential to enable continued bandwidth and capacity scaling
High Speed D2D Interconnect
Advanced functionality in base die
Increasing DRAM die activity
Increasing stack height
Liquid cooling
Hybrid Bonding
DRAM dice
Base die
Solder
TSV
Side mold
micron
![019_p015_00.jpg](figures/019_p015_00.jpg)
![020_p015_01.jpg](figures/020_p015_01.jpg)
![021_p015_02.jpg](figures/021_p015_02.jpg)
![022_p015_03.jpg](figures/022_p015_03.jpg)
![023_p015_04.jpg](figures/023_p015_04.jpg)
![024_p015_05.jpg](figures/024_p015_05.jpg)

Advanced packaging industry trends
Diverse interconnects, stacking, and bonding technologies enable high-performance, low-power memory and logic integration
Drivers
Area IO density scaling ubumps, pads, TSVs
Lateral IO scaling Lines and Spaces
Chip 1 Chip 2
Partitioning
Array, CMOS
Thermals and PDN
Hot spots Logic / Memory
Stacking technologies
Wafer
CoS
CoW/C2C/C2W
W2W
Interconnects
µbump
Fusion bonding
Bond Interface
Hybrid bonding
CoS: Chip on Substrate | CoW: Chip on Wafer | C2W: Chip to Wafer | W2W: Wafer to Wafer
micron
![025_p016_00.jpg](figures/025_p016_00.jpg)
![026_p016_01.jpg](figures/026_p016_01.jpg)
![027_p016_02.jpg](figures/027_p016_02.jpg)
![028_p016_03.jpg](figures/028_p016_03.jpg)
![029_p016_04.jpg](figures/029_p016_04.jpg)
![030_p016_05.jpg](figures/030_p016_05.jpg)
![031_p016_06.jpg](figures/031_p016_06.jpg)
![032_p016_07.jpg](figures/032_p016_07.jpg)
![033_p016_08.jpg](figures/033_p016_08.jpg)
![034_p016_09.jpg](figures/034_p016_09.jpg)

Collaboration enables a stronger future for all HBM turbocharging AI era
Unprecedented era
Number of years to get to 50 million users1
Number of months to get to 100 million users ChatGPT 2 months
Close collaboration
1. https://www.futrcolab.com/blogs/pace-of-change-to-hit-50-million-users
micron
![035_p017_00.jpg](figures/035_p017_00.jpg)

Intelligence Accelerated
micron
