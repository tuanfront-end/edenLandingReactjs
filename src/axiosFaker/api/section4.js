// @flow
const section4: Object = {
  section: "section4",
  sectionType: "textBox",
  data: {
    title: "How can you earn money <br/> from your website",
    content: "",
    textBox: {
      type: "textBox3",
      textBoxs: [
        {
          image: "assets/img/web_icons/paid-listings.svg",
          title: "Paid listings",
          content:
            "Listing owners will pay to get theirs places listed on your site. In Wilcity, you can create unlimited Pricing Plans, each of which includes different benefits."
        },
        {
          image: "assets/img/web_icons/promoted-listing.svg",
          title: "Promoted listing",
          content:
            "Choosing a promotion plan, listing owners will have directories appeared at the special spots on your site and at the top of the search result page."
        },
        {
          image: "assets/img/web_icons/paid-claim-listing.svg",
          title: "Paid claim listings",
          content:
            "Another revenue model to monetize from listing. You can create a listing on your site and allow the listing owner to claim it."
        }
      ]
    },
    button: {},
    buttonFooter: {}
  },
  settings: {
    textBoxCol: [12, 12, 4, 4],
    color: "black",
    divider: "",
    backgroundColor: "rgb(245, 245, 245)",
    backgroundImage: "",
    animations: [
      {
        position: "left",
        type: "squares"
      }
    ]
  },
  nextSection: "section5"
};

export default section4;
