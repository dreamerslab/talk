module.exports = {

  nav_home : {
    home : {
      klass : 'selected',
      url : '#'
    },
    about : {
      klass : '',
      url : '/about'
    },
    widget : {
      klass : '',
      url : '/widget'
    }
  },

  nav_about : {
    home : {
      klass : '',
      url : '/'
    },
    about : {
      klass : 'selected',
      url : '#'
    },
    widget : {
      klass : '',
      url : '/widget'
    }
  },

  nav_widget : {
    home : {
      klass : '',
      url : '/'
    },
    about : {
      klass : '',
      url : '/about'
    },
    widget : {
      klass : 'selected',
      url : '#'
    }
  },

  sub_nav_latest : {
    latest : {
      klass : 'selected',
      url : '#'
    },
    hottest : {
      klass : '',
      url : '/channel/hottest'
    }
  },

  sub_nav_hottest : {
    latest : {
      klass : '',
      url : '/channel/latest'
    },
    hottest : {
      klass : 'selected',
      url : '#'
    }
  },

  sub_nav_related : {
    latest : {
      klass : '',
      url : '/channel/latest'
    },
    hottest : {
      klass : '',
      url : '/channel/hottest'
    },
    related : {
      klass : 'selected',
      url : '#'
    }
  }
};
