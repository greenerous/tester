function getURL() {
  window.addEventListener('beforeunload', () => {
    return window.location;
  });
}

function aTag() {
  let arr = $.map($('a'), function (item) {
    return $(item).attr('href');
  });
  return arr;
}

async function dict(content, dict, depth) {
  window.location.href = content;
  let depth = 1;

  while (true) {
    if (dict[depth] === undefined) {
      dict[depth] = [];
    }

    let tagUrls = aTag();
    dict[depth] = dict[depth].push(await getURL()).push(...tagUrls);
    depth += 1;

    for (let url of tagUrls) {
      isSpam(url, dict, depth);
    }

    if (dict[depth].sort().join('') === dict[depth - 1].sort().join('')) {
      break;
    }
  }

  return dict;
}

function isSpam(content, domains, depth) {
  let dict = {};
  let urlDict = dict(content, dict, depth);

  for (let url of domains) {
    if (!urlDict[depth].includes(url)) {
      return false;
    }
  }
  return true;
}
