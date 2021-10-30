---
title: Coffee Roasting
categories: [life]
tags: [coffee]
date: 2020-08-16 19:25:18
---

## 09.20

最近喝咖啡比较凶，闲置很久的烘豆机重出江湖~ 但是原来无论控温还是记录都比较粗，很难把控，所以就萌生了Coffee Pi的想法，用树莓派武装烘豆机，加上2个温度传感器，打通烘豆软件Artisan画豆温、环境温度、风门变化的图。

不过，还没有好，哈哈，所以用了最传统的方式，温度仪 + `open roast` 先走一波，至少目前不会烤焦了。

!["open roast + 温度仪"](https://wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/coffee-roasting/coffee-open-roast.jpg)

树莓咖啡的雏形。

!["树莓咖啡"](https://wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/coffee-roasting/coffee-pi-0912.jpg)

哈哈，第一次把烘的豆带去公司做奶咖，味道可以的 👍

!["燕麦奶咖"](https://wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/coffee-roasting/make-coffee-0816.jpg)

---

> 以下是读书学习笔记

## Roasts Style and Flavor

* The most lightly roasted coffee (usually called `cinnamon`: internal bean temperature at conclusion of roast `below 400°F/205°C`; SCAA color tile #95) is very light brown in color, will display a strong, sometimes sour acidity, little aroma, an often grainy taste, and thin body. The surface of the bean will be dry.
* As the coffee achieves a more complete but still relatively `light` roast (New England, light: concluding internal bean temperature `around 400°F/205°C`; SCAA color tile #85), the acidy notes will be powerful, and the varietal characteristics, which often are nuances of acidity, will be pronounced. The body will be developed but not as fully as it will become in a somewhat darker roast. The surface of the bean remains dry, as the flavor oils continue to develop in tiny pockets inside the bean.
* At a darker, moderately light to `medium-brown` roast (light, medium, unnamed, American: concluding internal bean temperature `between 400°F/205°C and 415°F/215°C`; SCAA color tiles #75 through #65), the acidity will be bright but less overpowering, the varietal characteristics still pronounced, and body fuller. For most traditional American East Coast coffee drinkers, this style represents a “good” coffee taste.
* At a slightly darker, medium-brown roast (medium, medium high, unnamed, American, `city`: concluding internal bean temperature `415°F/215°C to 435°F/225°C`; SCAA color tile #55), acidity remains strong though perhaps richer, varietal characteristics muted but still clear, and body still fuller. This is the traditional roasting norm for most of the American West.
* At a slightly darker roast than the traditional North American norm, one coffee professionals often call `full city` (concluding internal bean temperature `435°F/225°C to 445°F/230°C`; between SCAA color tiles #55 and #45), acidity is slightly more muted and body slightly heavier. At this roast, only the more pronounced varietal characteristics, like the winelike acidity of Kenyan coffees, will persist. Subtler notes, like the elusive smokiness of some Guatemalan coffees, will be lost.
* At a moderately darker roast (`espresso`, European, `high`: concluding internal bean temperature `445°F/230°C to 455°F/235°C`; between SCAA color tiles #45 and #35), the acidity is largely folded into a general impression of richness, the varietal characteristics muted virtually beyond recognition, the body full, and the bittersweet notes characteristic of dark-roasted coffees rich and resonant. At this roast the surface of the bean always displays some oil, ranging from a few droplets to a shiny coating.
* When coffee is brought to a definitely dark roast (`French`, `Italian`, `dark`: concluding internal bean temperature `455°F/235°C to 465°F/240°C`; SCAA color tile #35), the bittersweet or dark-roast taste completely dominates, the body begins to thin again, and all remaining varietal character and acidy notes are transmuted inside the pungent richness of the dark-roast flavor, which may range from rounded and mellow (in less acidy coffees) to bordering on bitter (in coffees that begin very acidy). The surface of the bean will be bright with oil.
* With very dark brown roasts (Italian, dark French, Spanish, `heavy`: concluding internal bean temperature `465°F/240°C to 475°F/245°C`; between SCAA color tiles #35 and #25), the body continues to thin as more and more of the oils are evaporated by the roast, the bitterish side of the bittersweet equation becomes more dominant, and a slight charred taste may appear. Needless to say, acidy notes and varietal characteristics have long since been transformed into nuances of the dark-roast flavor. The bean is shiny with flavor oils driven to the surface.
* The ultimate dark roast, almost black (`dark French`, Spanish; concluding internal bean temperature `475°F/245°C to 480°F/250°C`; SCAA color tile #25) is definitely a special taste. The body is even thinner, the bittersweetness is still more bitter and less sweet, and burned or charred notes dominate. At this roast all coffees, regardless of origin, tend to taste about the same. The surface of the bean is glossy with oil. This unusual roast is not an espresso roast, by the way; espresso is best brewed with one of the dark-but-not-black, fuller-bodied, sweeter roasts described earlier. Home roasters typically have an opportunity to sample this ultimate dark roast, since sooner or later we all produce a batch whether we plan to or not.

!["roasting styles"](https://wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/coffee-roasting/roast-styles.png)

!["roasting styles flavor"](https://wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/coffee-roasting/roast-style-flavor.png)

## Roasting Requirements

* The beans must be subjected to `temperatures between 460°F and 530°F (240°C and 275°C)`. These temperatures can be considerably lower if the air around the beans is moving faster, as in hot-air or fluid-bed roasting apparatuses, or higher if the air is moving sluggishly, as it does in home gas ovens.
• The beans (or the air around them) must be `kept moving` to avoid uneven roasting or scorching.
* The roasting must be stopped at the right moment and the beans cooled promptly. (Prompt and effective cooling is an often overlooked but crucial element in coffee roasting.)
* Some provision must be made to vent the roasting smoke.

## Systematic Roasting: Controlling Variables

Informative experiment depends on control of four roasting variables:

* the `amount` of coffee roasted
* the `temperature` inside the roasting chamber
* the `identity` of the green coffee (in particular its approximate moisture content)
* the `time` or duration of the roast.

## Cupping at Home

Place the same volume of ground coffee in each cup or glass. Use about 2 level tablespoons or one standard coffee measure per 6-ounce cup. Meticulous professional cuppers weigh out ¼ ounce (7 grams) of coffee per 5 ounces (150 milliliters) of hot water.

* Breaking the Crust and Sampling the Aroma
* Tasting the Coffees Hot
* Tasting the Coffees Lukewarm

## Referrence

* [Home Coffee Roasting by Kenneth Davids](https://book.douban.com/subject/1980833/)