Operator: 
Thank you. We will now open the lines for a question and answer session. To 
ask a question, please press star one on your touchtone phone. To withdraw 
your question, again press star one. Please limit yourself to one question. 
Please pick up your handset before asking your question to ensure clarity. If 
you are streaming today’s call, please mute your computer speakers. And your 
first question comes from the line of Brian Nowak with Morgan Stanley. Please 
go ahead. 
 
Brian Nowak: 
Great, thanks for taking my questions. I have two. The first one is on Llama. 
Mark, can you -- the LLM landscape continues to sort of evolve and be 
somewhat competitive. 
 
 
Can you sort of talk us through some of the key areas of advancement you are 
most focused on and excited about as we sort of think about Behemoth and 
next versions of Llama to come? 
 
 
And then the second one on Meta AI, almost 1 billion users globally. Any help on 
sort of how you’re seeing U.S. traction there and the types of recurring user 
behaviors that you’re seeing in the early Meta AI use cases? Thanks. 
 
Mark Zuckerberg: Sure. I can talk about the LLMs. On the Meta AI usage, I’m not sure if we have 
more stats to share on that now. Yes. It’s -- I’ll defer to Susan on if there’s 
anything that we’re ready on that. 
 
 
On the LLM, yes, there’s a lot of progress being made in a lot of different 
dimensions. And the reason why we want to build this out is one, is that we 
think it’s important that for kind of how critical this is for our business that we 
sort of have control of our own destiny and are not depending on another 
company for something so critical. 
 
 
But two, we want to make sure that we can shape the development to be 
optimized for our infrastructure and the use cases that we want. 
 
 
So to that end, Llama 4, the shape of the model with 17 billion parameters per 
expert was designed specifically for the infrastructure that we have in order to 
provide the low latency experience to be voice optimized. 

10 
 
 
 
One of the key things, if you’re having a voice conversation with AI is it needs 
to be low latency. That way when you’re having a conversation with it, there’s 
isn’t a large gap between when you stop speaking and it starts. 
 
 
So everything from the shape of the model to the research that we’re doing to 
the techniques that go into it are kind of fit into that. 
 
 
Similarly, another thing that we focused on was context window length. And in 
some of our models, we have really -- we’re industry-leading on context 
window length. 
 
 
And part of the reason why we think that that’s important is because we’re 
very focused on providing a personalized experience. And there are different 
ways that you can put personalization context into an LLM, but one of the 
ways to do it is to include some of that context in the context window. And 
having a long context window that can incorporate a lot of the background that 
the person has shared across our apps is one way to do that. 
 
 
So that’s like -- it kind of is giving you a flavor of the products that we’re trying 
to build and then some specific technical architecture decisions and research 
prioritization that we basically have made in order to deliver the specific 
experience that we’re going for. 
 
 
I could go on and add a lot more. The reason I think it’s also very important to 
deliver big models like Behemoth, not because we’re going to end up serving 
them in production, but because of the technique of distilling from larger 
models, right. The Llama 4 models that we’ve published so far and the ones 
that we’re using internally and some of the ones that we’ll build in the future, 
are basically distilled from the Behemoth model in order to get the 90%, 95% 
of the intelligence of the large model in a form factor that is much lower latency 
and much more efficient. 
 
 
So these things are all very important. Obviously we wouldn’t be able to do that 
kind of distillation from other closed models. 
 
 
So that kind of gives you a flavor for how we’re thinking about the 
development of this and then, of course, the models and the infrastructure that 
we’re building out power all of the opportunities that I mentioned before. 
 
Susan Li: 
Brian, I’m happy to answer your second question about Meta AI. The top use 
case right now for Meta AI from a query perspective is really around 
information gathering as people are using it to search for and understand and 
analyze information followed by social interactions from, ranging from casual 
chatting to more in-depth discussion or debate. 
 
 
We also see people use it for writing assistance, interacting with visual content, 
seeking help. And we see Meta -- people engage with Meta AI from several 
different entry points. WhatsApp continues to see the strongest Meta AI usage 
across our Family of Apps. 

11 
 
 
 
Most of that, WhatsApp engagement is in one-on-one threads, followed by 
Facebook, which is the second largest driver of Meta AI engagement, where 
we’re seeing strong engagement from our feed deep dives integration that lets 
people ask Meta AI questions about the content that’s recommended to them. 
And we’re obviously excited about the launch of the Meta AI standalone app. 
 
Operator: 
Your next question comes from the line of Eric Sheridan with Goldman Sachs. 
Please go ahead.

Eric Sheridan: 
Thanks so much for taking the question. Maybe following up on Brian’s 
question and coming at it from a different angle. I appreciate the color on the 
use cases you’re seeing today for Meta AI. How would you suspect those use 
cases evolve with a standalone app? 
 
 
Can you bring us into a little bit of the decision process to do a standalone app, 
what that might change in terms of utility, frequency or scale relative to what 
you see inside Family of Apps today? And how do you think about positioning 
Meta AI as a standalone app, I guess, the competitive landscape today of other 
standalones for the consumer AI apps? Thank you. 
 
Mark Zuckerberg: Yes. I can talk about that. We’re going to focus on both integrating it into our 
Family of Apps in more ways and building a standalone experience. 
 
 
I think some people want faster access to it or a more built out feature set than 
you can build into an app like WhatsApp. So the standalone app will be valuable 
for that. 
 
 
I also think the standalone app is going to be particularly important in the 
United States because WhatsApp, as Susan said, is the largest surface that 
people use Meta AI in which makes sense if you want to text an AI, having that 
be closely integrated and a good experience in the messaging app that you use 
makes a lot of sense. 
 
 
But we’re -- while we have more than 100 million people use WhatsApp in the 
United States, we’re clearly not the primary messaging app in the United 
States at this point, iMessage is. 
 
 
We hope to become the leader over time. But we’re in a different position there 
than we are in most of the rest of the world on WhatsApp. 
 
 
So I think that the Meta AI app as a standalone is going to be particularly 
important in the United States to establishing leadership in as the main 
personal AI that people use. But we’re going to keep on advancing the 
experiences across the board in all of these different areas. 
 
Operator: 
Your next question comes from the line of Justin Post with Bank of America. 
Please go ahead. 
 

12 
 
Justin Post: 
Great, thank you. A couple of questions. Just on the guide in the second 
quarter, there are reports of potential supply issues in eCommerce, how you 
thought about that in the guide and maybe how you’re thinking about it for the 
back half. And then on a bigger picture question.  
 
 
Your CapEx spend is now close to some hyperscalers with very big client bases. 
Just help us conceptualize the kind of ecosystem you’re building with your 
CapEx. I know you gave a lot of help on the intro, but maybe the ROI works 
without direct enterprise spend to drive revenues. How you’re thinking about 
that? Thank you. 
 
Susan Li: 
Thanks, Justin. On the Q2 guide, there’s uncertainty, obviously in how the 
macro environment will evolve over time and how that could impact different 
segments of our business. 
 
 
Our Q2 revenue outlook aims to factor that in. And partly -- that’s partly why 
the $3 billion range reflects the potential for a wider range of outcomes. 
 
 
Specifically, we have seen some reduced spend in the U.S. from Asia-based e-
commerce exporters, which we believe is in anticipation of the de minimis 
exemption going away on May 2nd. A portion of that spend has been 
redirected to other markets, but overall spend for those advertisers is below 
the levels prior to April. 
 
 
But our Q2 outlook reflects the trends we’re seeing so far in April, which have 
generally been healthy. So it’s very early. Hard to know how things will play out 
over the quarter and certainly harder to know that for the rest of the year. 
 
 
Your second question is about why we’re investing more in CapEx. And we 
really believe that our ability to build world-class infrastructure gives us a 
meaningful advantage in both developing the leading AI technology and 
services over the coming years. And there are a lot of opportunities also for us 
to improve our core business by putting more compute against our ads and 
recommendation work. 
 
 
So even with the capacity that we’re bringing online in 2025, we are having a 
hard time meeting the demand that teams have for compute resources across 
the company. 
 
 
So we are going to continually invest meaningfully here across our 
infrastructure footprint, but we are also really looking to build this capacity in a 
way that gives us the maximum flexibility in how and when we deploy it over 
the coming years, so we can respond to how the market and technology 
develop. 
 
Operator: 
Your next question comes from the line of Doug Anmuth with J.P. Morgan. 
Please go ahead. 
 
Douglas Anmuth: Thanks for taking the questions. I just wanted to follow up on CapEx and 
infrastructure spending. Just on the higher range for CapEx. 

13 
 
 
 
Can you just help us understand how much of that is tied to the additional data 
center investments versus the increased hardware costs and really what’s 
driving those higher hardware costs?  
 
 
And then separately, there have been some articles suggesting that you’ve 
been looking to partner to share some of the cost of the AI infrastructure build-
out. Can you just help us understand your thought process there and some of 
the pros and cons of going alone versus partnering? Thanks.

Susan Li: 
Thanks, Doug. So our increased CapEx outlook reflects both of those updates, 
the increased data center spend this year as we have made some adjustments 
to flex our build strategy that will enable us to really stand up capacity more 
quickly, both in ‘25 and ‘26. 
 
 
We haven’t broken down sort of the exact drivers. The higher costs we expect 
to incur for infrastructure hardware this year really comes from suppliers who 
source from countries around the world. And there’s just a lot of uncertainty 
around this, given the ongoing trade discussions. 
 
 
And so that is both reflected in the wider range that we are giving. And we’re 
also working on our end on mitigations by optimizing our supply chain, and our 
outlook is really trying to reflect our best understanding of the potential impact 
this year across all of that uncertainty. 
 
 
On the second part of your question, we are -- we’re pleased to have partners 
investing alongside us and bringing Llama to market like AWS and Azure who 
are helping us host Llama. 
 
 
We’re always looking for opportunities to continue deepening or expanding 
those partnerships. But we are funding the infrastructure that is being used to 
train Llama, and we don’t have any expectation that that will change at this 
point. 
 
Operator: 
Your next question comes from the line of Mark Shmulik with Bernstein. Please 
go ahead. 
 
Mark Shmulik: 
Yes, thanks for taking the questions. Mark, in your conversation last night with 
Satya, I think you both discussed a bit around kind of the portion of code being 
written internally by AI. Kind of back to some of your previous comments 
around this being the year where we might see an AI kind of the place of a mid-
level engineer. 
 
 
With the world evolving so quickly, can you share some places where you’ve 
seen strong traction there? And are we progressing kind of faster, slower or as 
you expected towards this milestone?  
 
 
And then, Susan, with the expense guidance coming down just a touch, how 
should we think about just the overall cadence of expected spending really as it 

14 
 
relates to kind of core business performance and the realities of the day-to-day 
world we’re living in? 
 
Mark Zuckerberg: I can talk about the coding agent work. I don’t think that there’s been any real 
change in our prediction for the timing of this. 
 
 
So I’d say it’s basically still on track for something around a mid-level engineer 
kind of starting to become possible sometime this year, scaling into next year. 
So I’d expect that by the middle to end of next year, AI coding agents are going 
to be doing a substantial part of AI research and development. So we’re 
focused on that. 
 
 
Internally, we’re also very focused on building AI agents or systems that can 
help run different experiments to increase recommendations across our other 
AI products like the ones that do recommendations across our feeds and things 
like that. 
 
 
So I think that, if it works, should just accelerate our progress in those areas, 
that’s the basic bet that we’re making. 
 
Susan Li: 
On your second question about our lowered expense outlook. Really, we are 
four months into the year. The lowered outlook reflects more refined forecasts 
including updated expectations for both employee compensation as well as 
some other non-headcount-related operating expenses this year.  
 
 
And that’s partially offset by higher expected infrastructure costs related to 
our increased CapEx outlook as well as higher expected Reality Labs cost of 
goods sold. And we’ve maintained our $5 billion range just given the more 
dynamic operating environment that we’re in. 
 
 
And what I would say is our investment posture today reflects the significant 
opportunities that we see across each of the company and priorities that we’re 
investing in this year. We will obviously continue evaluating depending on how 
macro conditions more broadly evolve. 
 
 
But we really feel like these are big strategic priorities for us and are critical for 
us to continue investing in. And in fact, I think one of the aims of our efficiency 
work over the last two years was to put us in a stronger financial position so 
that we can continue investing in key priorities through tougher financial 
cycles. 
 
Operator: 
Your next question comes from the line of Ross Sandler with Barclays. Please 
go ahead. 
 
Ross Sandler: 
Great. Mark, yesterday in one of your many kind of podcast or keynote 
presentations, you had mentioned that like a bunch of projects that your teams 
want to or aspire to do are kind of bottlenecked by the AI capacity, which 
Susan just talked about earlier and that even some of the testing that the ad 
ranking team wants to run is just getting kind of delayed. 
 

15 
 
 
So I guess looking out either this year or next year or whatever, when do you 
kind of see some of this constraint being eased back? And more broadly, we’re 
kind of three years past the IDFA impact to your business. 
 
 
So where do you think we are in terms of just the overall improvements to the 
ad ranking system, the ROI that you guys are able to deliver? And like what 
inning are we in on that in your opinion? Thank you very much.

Susan Li: 
I can take a shot at both of those and Mark, you can obviously chime in. On the 
first question, the capacity landscape we are in is pretty dynamic, both in terms 
of the many moving parts in terms of us bringing capacity online, but also in 
terms of the demand from different product groups in our company, whether 
they are in the gen AI teams or whether they’re doing more of the core AI work 
around ranking and recommendations. 
 
 
So both the supply and demand are quite fluid. And so we don’t have a sort of 
fixed answer in terms of when we expect that we will sort of have enough 
supply to meet all demand, but that’s something that we are working very hard 
to alleviate and it’s part of why we accelerated bringing more data center space 
online this year. And also, we’re very focused on increasing the efficiency of our 
workloads over the course of the year. On your second question about ads 
performance, ads ranking. 
 
 
We have invested for many years and continue to invest in driving ad 
performance improvements. Year-over-year conversion growth remains 
strong. And in fact, we continue to see conversions grow at a faster rate than 
ad impressions in Q1, so reflecting increased conversion rates, and ads ranking 
and modeling improvements are a big driver of overall performance gains. 
 
 
We have a lot of innovations in model architecture in both the ads retrieval and 
ranking stages of the ads delivery process to serve more relevant ads to 
people. 
 
 
We talked about the introduction of the new GEM ads recommendation model 
in Q1. And we have talked about some of the prior model architecture 
improvements like Lattice and Andromeda in past quarters. 
 
 
For us, we really believe, first and foremost, that advertising is a relative 
performance game. That’s especially important for us because the vast 
majority of our business is direct response advertising. 
 
 
So we feel good about how the prior investments are paying off and we 
continue to invest in a lot of different work to constantly improve our ads 
ranking and recommendations performance. 
 
Operator: 
Your next question comes from the line of Kenneth Gawrelski with Wells Fargo. 
Please go ahead. 
 

16 
 
Kenneth Gawrelski: 
Thank you so much. Two for me, please. First, maybe, Mark, how should we 
think about the timing of AI capabilities necessary to drive WhatsApp for 
business adoption in higher labor -- cost labor markets? 
 
 
What is Meta doing to accelerate that adoption? And do you see this as mostly 
incremental to SME ad spend that you’re already capturing? And then for 
Susan, one, please. 
 
 
What is the revised CapEx outlook for this year for ‘25 mean about future 
years? Does it mean anything? Or you talked about this being an acceleration in 
your revised outlook statement. 
 
 
Should we think about this as a new starting point for -- to think about ‘26 and 
beyond? Or should we just start fresh in ‘26 and think about the needs in 
capacity at that point? Thank you. 
 
Susan Li: 
I’m happy to take -- I’ll go ahead and take both of those. And Mark, you should 
feel free to chime in wherever you would like. 
 
 
So Mark talked a little bit about our general vision that every business will soon 
have an AI that is an expert on their business for their customers to talk to you 
in the same way that today, they’ve got e-mail and websites, social media 
presences, et cetera. 
 
 
We are currently testing business AIs with a limited set of businesses in the 
U.S. and a few additional countries on WhatsApp, Messenger and ads on 
Facebook and Instagram. 
 
 
We’ve been starting with small business and focusing first on helping them sell 
their goods and services with business AIs. 
 
 
But ultimately, we are working on tools to support businesses at every stage of 
the customer funnel from lead generation to order management and customer 
service. And a core area that we’re addressing right now is really the ability for 
businesses to customize and control the agent to achieve the outcome that 
they want. 
 
 
So we’ve launched a new agent management experience and dashboard that 
makes it easier for businesses to train their AI based on existing information on 
their website or WhatsApp profile or their Instagram and Facebook pages, and 
we’re starting with the ability for businesses to activate AI in their chats with 
customers. 
 
 
We are also testing business AIs on Facebook and Instagram ads that you can 
ask about product and return policies or assist you in making a purchase within 
our in-app browser. 
 
 
So again, the ultimate vision is to build an experience that serves customers 
across all of these different services and apps. No matter where you engage 

17 
 
with the business AI, it should be one agent that recalls your history and your 
preferences.  
 
 
And we’re hearing encouraging feedback, particularly that adopting these AIs 
are saving the business that we’re testing with a lot of time in helping to 
determine which conversations make sense for them to spend more time on. 
And then your second question, right, was about 2026 CapEx. 
 
 
Infrastructure, as I alluded to earlier, just is a very dynamic planning area given 
the continued advances in AI and also for us, the fact that we continue to find a 
lot of good use cases to put capacity toward in our core AI ranking and 
recommendations work. So I would say it’s too early to discuss plans beyond 
2025. 
 
Operator: 
Your next question comes from the line of Youssef Squali with Truist 
Securities. Please go ahead.

Youssef Squali: 
Great, thank you guys for taking the questions. So Mark, in a world where we 
now have maybe 5 to 10 chatbots including Meta AI on our smartphones doing 
virtually the same thing. Do you think this is a market much like Search where 
the winner takes most or is it likely to be much more fragmented? 
 
 
But in either case, what would you say are the top two or three competitive 
advantages of Meta AI? And then Susan, on the EU decision in connection with 
the DMA, what kind of modifications will you need to make to the apps? And 
can you maybe just help us gauge the potential financial fallout, understanding 
that it may obviously be too early. Thank you. 
 
Mark Zuckerberg: Yes. On Meta AI, I mean I think that there are going to be a number of different 
agents that people use, just like people use different apps for different things. 
 
 
I’m not sure that people are going to use multiple agents for the same exact 
things, but I’d imagine that something that is more focused on kind of 
enterprise productivity might be different from something that is somewhat 
more optimized for personal productivity and that might be somewhat 
different from something that is optimized for entertainment and social 
connectivity. 
 
 
So I think that there will be different experiences. One of the trends that I think 
we’re starting to see now is personalization across these. Right now if the 
experience is unpersonalized then you can kind of just go to different apps and 
get reasonably similar answers to different questions. 
 
 
But once an AI starts getting to know you and what you care about and context 
and can build up memory from the conversations that you’ve had with it over 
time, I think that will start to become somewhat more of a differentiator. 
 
 
So that’s one thing that we think will matter. And then, of course, there’s all the 
different modalities being able to not just answer questions about -- in text, but 
being able to do voice and multimodal and be able to produce images and 

18 
 
videos and understand all those things and have good conversations about 
that, I think, is going to be important overall. 
 
 
So yes. I mean I think Meta AI is well positioned, but we have a lot of work to do 
in order to make it the leading personal AI. 
 
Susan Li: 
And Youssef, on your second question, it is really too early to speak about what 
those changes could be because we are in the process of engaging with the 
European Commission. 
 
 
I think maybe the most useful sort of metric I could give you is just that our 
advertising revenue in the European economic area and Switzerland, which 
would be the geographies impacted here, was 16% of our worldwide total 
revenue in 2024. Again, we are continuing to engage actively with the 
European Commission further on this, so we hope to have more clarity by next 
quarter’s call. 
 
Kenneth Dorell: 
Krista, we have time for one last question. 
 
Operator: 
Your last question comes from the line of Mark Mahaney with Evercore ISI. 
 
Mark Mahaney: 
Thanks, I’ll just throw in two. I think you called out that the China-based 
retailers as one sort of potentially soft advertising vertical. Anything else you’d 
call out? And I would just suggest autos. 
 
 
Is that an area of any softness? And then on the Reality Labs and on the losses 
associated with Reality Labs, they’ve been very consistent $4 billion a quarter 
for quite some time. 
 
 
Is there light at the end of the tunnel? Is there a reason to think, is there a factor 
that would occur that would cause those losses to come down and when would 
that be? But maybe more importantly, what is going to cause those losses to 
come down? Thank you very much. 
 
Susan Li: 
Mark, let me take your first question about other verticals. We generally saw 
healthy growth in most verticals in Q1. We did see some weakness in gaming 
and politics. 
 
 
So year-over-year growth in gaming was negative in Q1 as we lapped a period 
of strong spend from China-based advertisers that were promoting a larger 
volume of game titles in Q1 of 2024. And then year-over-year growth in the 
government and politics vertical dropped sharply as expected with the 
conclusion of U.S. elections. But that continues to just be a very small vertical 
overall. And then your second question on Reality Labs.

Mark Zuckerberg: Yes. I can take the Reality Labs one. I mean we’re basically focused on doing 
the work more efficiently. But as the AI glasses have really taken off, I’ve talked 
about this on a number of calls. There are more investments that I think makes 
sense to make around making sure that we can distribute this and grow it very 
quickly. 

19 
 
 
 
I mean some of the -- if you look at some of the leading consumer electronics 
products of other categories, by the time they get to their third generation, 
they’re often selling 10 million units and scaling from there. And I’m not sure if 
we’re going to do exactly that, but I think that that’s like the ballpark of the 
opportunity that we have. And that’s something that I think we’re kind of 
focused on scaling to that and then scaling beyond that for the generations 
after that. 
 
 
So I think some of the effort that we’re doing is going to -- we’re going to get 
more efficient in some parts of the work that we do. 
 
 
But then as a bunch of the products start to hit and start to grow even bigger 
than the number that I just said is just sort of like the near-term milestone, then 
I think we’ll continue scaling in terms of distribution. 
 
 
And then at some point, just like the other products that we build out, we will 
feel like we’re at a sufficient scale that we’re going to primarily focus on making 
sure that we’re monetizing and building an efficient business around it. 
 
 
But -- that’s kind of where we’re at on it. We’re definitely focused on doing the 
work more efficiently, but also very optimistic about what we’re seeing in the 
results, especially on the AI glasses side. 
 
Kenneth Dorell: 
Thank you everyone for joining us today, and we look forward to speaking to 
you again soon.
