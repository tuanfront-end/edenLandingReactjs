const appSection4 = {
  section: "appSection4",
  sectionType: "default",
  data: {
    icon: "",
    title: "Test Wilcity <br/> Application On <br/> Simulation",
    content: `<p>You can quickly test Wilcity App by using Simulation beside. Note that when  testing with the Simulator, the experience will not smooth like on Real Phone.</p> <br/> <p>You can download the App to your device by clicking on the buttons below</p>`,
    image: {},
    button: {},
    groupButtonForDownloadApp: {
      btnIos: "https://testflight.apple.com/join/XPBd7Sii",
      btnAndroid:
        "https://play.google.com/store/apps/details?id=com.wiloke.Wilcity&hl=en"
    },

    phones: {
      phone1: `<iframe src="https://appetize.io/embed/8bnmakzrptf1hv9dq7v7bnteem?autoplay=true&amp;debug=true&amp;device=iphone6s&amp;deviceColor=white&amp;embed=true&amp;orientation=portrait&amp;screenOnly=false&amp;xDocMsg=true&amp;xdocMsg=true&amp;params=%7B%22EXKernelLaunchUrlDefaultsKey%22:%22exp:%2F%2Fexpo.io%2F@wiloke%2Fwilcity%2BSJ9lHlDmN%22,%22EXKernelDisableNuxDefaultsKey%22:true%7D&amp;scale=70&amp;osVersion=11.4" frameborder="0" width="416" height="870"></iframe>`,
      phone2: `<iframe src="https://appetize.io/embed/xc1w6f1krd589zhp22a0mgftyw?autoplay=false&amp;debug=true&amp;device=nexus5&amp;deviceColor=black&amp;embed=true&amp;launchUrl=exp%3A%2F%2Fexpo.io%2F%40wiloke%2Fwilcity%2BBk4rdmPmV&amp;orientation=portrait&amp;screenOnly=false&amp;xDocMsg=true&amp;xdocMsg=true&amp;params=%7B%22EXKernelLaunchUrlDefaultsKey%22%3A%22exp%3A%2F%2Fexpo.io%2F%40wiloke%2Fwilcity%2BBk4rdmPmV%22%2C%22EXKernelDisableNuxDefaultsKey%22%3Atrue%7D&amp;scale=70" frameborder="0" width="400" height="795"></iframe>`
    }
  },
  settings: {
    color: "white",
    divider: "white",
    textType: "text-left",
    backgroundColor: "",
    backgroundImage: "linear-gradient(90deg, #742de4 0%, #59c0ff 100%)",
    animations: [
      {
        position: "left",
        type: "squares"
      }
    ]
  },
  nextSection: "appSection5"
};

export default appSection4;
