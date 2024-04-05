[YIMBYpedia](https://yimbypedia.org) is a compendium of YIMBY legislative efforts.

It's a static website generated using the excellent [Hugo](https://gohugo.io) framework. 

Pull requests for improvements, additions to bill compendium, and bug fixes are all welcome. 

To run the site locally, just clone the repo then `npm install` and `npm run dev`.

For now, the bill data is just in a big JSON object at `/data/bills.json`.

The markdown files are in `/content/bills` are generated from that file by the script at `/bin/make-pages.js`. 