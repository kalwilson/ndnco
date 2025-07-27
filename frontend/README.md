# Native Digital Networking Community, aka. *NDNCo*✨

**Navigation:**
[Problem Space](#problem-space)
[User Profile](#user-profile)
[Features](#features)
[Tech Stack](#tech-stack)
[API](#api)
[Sitemap](#sitemap)
[Data](#data)

### Problem Space:

While there are other Indigenous business directories, none of them have been specifically created to beneift Indigenous peoples. _Most_ are created strictly to advertise, to target non-Indigenous shoppers. We plan on doing things differently. **We plan on building a space for Indigenous entrepreneurs to connect, network, uplift each other, and build an incredible community online.** The directory is just the first step.

### User Profile:

Our main user focus is Indigenous entrepreneurs, and Indigenous shoppers.

### Features:

Main focus, is setting up the directory. A list of Indigenous businesses that can be filtered through categories and subcategories. Potentially setting up a search function would be nice too.

### Tech Stack:

Vue.js, Pinia, Node.js, Express.js, PostgreSQL, and Sass.

### API:

_To see the backend, and endpoints_ [Click here!](https://github.com/kalwilson/kal-wilson-capstone-api.git)

I will be creating my own backend and database with PostgreSQL. _In the future,_ I will be using Leaflet API, with OSM map tiles to integrate a mapping feature.

### Sitemap:

**Home:** Hero statement, example of what a business can look like on the site.
**Directory:** A list of all the (mock) businesses currently on the site.
**Register:** Form that sends business data to be verified.
**About:** How the idea came to be, but mostly how it can benefit users.
**Legal:** Terms & Conditions, Privacy Policy, Cookie Policy, Accessibility Policy... I think I'm forgetting one. Each will have their own view, and be included in the footer.

_Future views:_

- User profile
- Edit
- Admin panel
- Resources
- Communities

### Data:

Data will be strictly for businesses in the beginning.

**Core business data:**

- Business name
- Business description
- Business category and subcategories
- Business type
- Year business established.
- Business owner name
- Business contact information
  - email
  - phone number
  - website
  - social media
- Business location
  - on/off Indigenous reserve lands
- Business Hours
- Create uuid for each business

**Future business data:**

- Business logo
  - need to set a max image size
  - find storage/hosting for images
- Get business updated date
- Potential verified data
- Featured status
- Products/Services (list, type, tags)
- Business certifications/awards
- User reviews
- If business is open to working with others

_Business Owner data:_

- business id, foreign key linking
- business role, permissions.

**Future user data:**

- uuid for each user
- Username
- Email
- Password (hashed, bcrypt)
- User full name
- User community (if applicable)
- Profile photo
- User roll
  - Admin
  - Mod
  - General (Indigenous, non-Indigenous)
  - Business owner
- User permissions
- User location, Indigenous Nation's land
- User last login
- User email verified
- Favourite businesses
- User reviews

**Future plans:**

- Admin auth
- Admin panel

- User auth
  - diff user levels/roles mentioned prev.
- User reviews mentioned prev.
- Business owner interviews! Sharing:
  - Advice/Tips
  - Roadblocks/Pitfalls
  - Successes
  - What they wish they had done differently
- Community info hubs
  - job postings
  - event postings
- Community admins/mods
  - verify their own people
- Information/Resources:
  - cultural/language resource links
  - helpful links all in one place
  - dealing with status card exemption
    - Indigenous lawyers list

[Back to top](#native-digital-networking-community-aka-ndnco)
