module.exports = {
  'takes user to the item page': function (browser) {
    browser
      .url('http://localhost:8080') // #A
      .waitForElementVisible('.item', 15000)
      .click('.comments-link') // #C
      .assert.urlContains(`/item`) // #D
      .waitForElementVisible('.item-view', 15000) // #E
      .end()
  },
  'clicking on a user redirects to  the user page': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.item', 15000)
      .click('.by a') // #A
      .assert.urlContains(`/user`) // #B
      .waitForElementVisible('.user-view', 30000) // #C
      .end()
  },
  'paginates items correctly': function (browser) {
    let originalItemListText
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.item', 15000) // #A
      .getText('.item-list', function (result) { // #B
        originalItemListText = result.value.slice(0, 100)
      })
      .click('.item-list-nav a:nth-of-type(2 )') // #C
      .waitForElementNotPresent('.progress', 15000) // #D
      .perform(() => { // #E
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText)
      })
      .getText('.item-list', function (result) { // #F
        originalItemListText = result.value.slice(0, 100)
      })
      .click('.item-list-nav a') // #G
      .waitForElementNotPresent('.progress', 15000)
      .perform(() => { // #H
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText)
      })
  },
  'changes list by clicking through nav': function (browser) {
    let originalItemListText
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.item', 15000) // #A
      .getText('.item-list', function (result) { // #B
        originalItemListText = result.value.slice(0, 100)
      })
      .click('.inner a:nth-of-type(2)') // #C
      .waitForElementNotPresent('.progress', 15000)
      .perform(() => {
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText) // #D
      })
      .getText('.item-list', function (result) { // #E
        originalItemListText = result.value.slice(0, 100)
      })
      .click('.inner a:nth-of-type(4)') // #F
      .waitForElementNotPresent('.progress', 15000)
      .perform(() => {
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText) // #G
      })
  }
}
