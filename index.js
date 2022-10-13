/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (needKeys, dataArr) => {
    return dataArr = dataArr.reduce((cur, nxt) => {
      for (const item in nxt) {
        if (needKeys.includes(item)) {
          delete nxt[item]
        }
      }
      cur.push(nxt);
      return cur;
    }, [])
  }
  exports.excludeByProperty = (deleteStr, dataArr) => {
    return dataArr = dataArr.filter(obj => !obj.hasOwnProperty(deleteStr))
  };
  exports.sumDeep = (dataArr) => {
    return dataArr.reduce((cur, nxt) => {
      cur.push({objects: nxt.objects.reduce((c, n) => { return c += n.val}, 0)});
      return cur;
    }, [])
  };
  exports.applyStatusColor = (colorObj, dataArr) => {
    const status2color = {}, resultArr = [];
    for (const colorKey in colorObj) {
      const statusArr = colorObj[colorKey];
      for (const status of statusArr) {
        status2color[status] = colorKey;
      }
    }
    for (let i = 0; i < dataArr.length; i++) {
      const value = dataArr[i];
      
      if (status2color[value.status]) {
        resultArr.push({
          status: value.status,
          color: status2color[value.status]
        }) 
      }
    }
    return resultArr;
  };
  exports.createGreeting = (greetFunc, sayStr) => {
    return function (name) {
      return greetFunc(sayStr, name);
    };
  };
  exports.setDefaults = (defaultObj) => {
    return function (needObj) {
      return { ...defaultObj, ...needObj }
    }
  };
  exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
    let companyId = 0, userTem = {};
    const infos = await Promise.all([services.fetchUsers(), services.fetchStatus()])
    const userInfo = infos[0];
    const statusInfo = infos[1];
    for (const user of userInfo) {
      if (user.name === userName) {
        companyId = user.companyId;
        userTem = user;
      }
    }
    const companyInfo = await services.fetchCompanyById(companyId);
  
    return {
      company: companyInfo,
      status: statusInfo,
      user: userTem
    }
  };
