import rgbHex from 'rgb-hex';
describe('Header', () => {
  describe('Memastikan bahwa header website terdiri dari navigasi (menu ataupun submenu) sesuai desain yang ada dan berhasil direct ke page yang dimaksud ketika diklik', () => {
    beforeEach(() => {
      cy.viewport(1920, 1280)
      cy.loginAdmin()
      cy.baseUrl()
      cy.general();
    })

    it('Lihat header website', () => {
      cy.get('.logo > img').should('have.attr', 'src').should('include', 'logo.png')
      cy.get('.top-header > .sponsored > [href="http://www.pan-uk.org/"] > img')
        .should('have.attr', 'src').should('include', 'pan@2x.png')
      cy.get('.top-header > .sponsored > [href="https://www.solidaridadnetwork.org/"] > img')
        .should('have.attr', 'src').should('include', 'solidaridad@2x.png')
      cy.get('.first > .gtm-top-nav').contains('Cotton Papers')
      cy.get('nav .nav > li a').eq(1).contains('Cotton Rankings')
      cy.get('nav .nav > li a').eq(2).contains('Recommendations')
      cy.get('nav .nav > li a').eq(3).contains('Contact')
      cy.get('.icon-search').should("be.visible")
      cy.get('.icon-share').should("be.visible")
    });

    it('Klik pada Title COTTONBAROMETER', () => {
      cy.get('.logo > img').click()
      cy.url().should('eq', 'https://sustainablecottonhub.org/')
    });

    it('Klik pada logo Pesticide Action Network UK', () => {
      cy.get('.sponsored a').eq(0).invoke("attr", "target", "_blank").click()
      cy.get('.sponsored a').eq(0).should('have.attr', 'href', 'http://www.pan-uk.org/')
    });

    it('Klik pada logo Solidaridad', () => {
      cy.get('.sponsored a').eq(1).invoke("attr", "target", "_blank").click()
      cy.get('.sponsored a').eq(1).should('have.attr', 'href', 'https://www.solidaridadnetwork.org/')
    });

    it('Hover dan klik pada menu Cotton Papers', () => {
      cy.get("nav .nav > li a").eq(0).should('have.css', 'color').and('be.colored', '#555555');
      cy.wait(5000)
      cy.get("nav .nav > li a").eq(0).realHover();
      cy.get("nav .nav > li a").eq(0).should('have.css', 'color').and('be.colored', '#319044');
      cy.get("nav .nav > li a").eq(0).click();
      cy.url().should('eq', 'https://sustainablecottonhub.org/cotton-papers')
    });

    it('Hover dan klik pada menu Company Rankings', () => {
      cy.get("nav .nav > li a").eq(1).should('have.css', 'color').and('be.colored', '#555555');
      cy.wait(5000)
      cy.get("nav .nav > li a").eq(1).realHover();
      cy.get("nav .nav > li a").eq(1).should('have.css', 'color').and('be.colored', '#319044');
      cy.get("nav .nav > li a").eq(1).click();
      cy.url().should('eq', 'https://sustainablecottonhub.org/cotton-rankings')
    });

    it('Hover dan klik pada menu Recommendations', () => {
      cy.get("nav .nav > li a").eq(2).should('have.css', 'color').and('be.colored', '#555555');
      cy.wait(5000)
      cy.get("nav .nav > li a").eq(2).realHover();
      cy.get("nav .nav > li a").eq(2).should('have.css', 'color').and('be.colored', '#319044');
      cy.get("nav .nav > li a").eq(2).click();
      cy.url().should('eq', 'https://sustainablecottonhub.org/recommendations')
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    });

    it('Hover dan klik pada menu Contact', () => {
      cy.get("nav .nav > li a").eq(3).should('have.css', 'color').and('be.colored', '#555555');
      cy.wait(5000)
      cy.get("nav .nav > li a").eq(3).realHover();
      cy.get("nav .nav > li a").eq(3).should('have.css', 'color').and('be.colored', '#319044');
      cy.get("nav .nav > li a").eq(3).click();
      cy.url().should('eq', 'https://sustainablecottonhub.org/contact')
    });

    it('Hover dan klik pada icon Search', () => {
      cy.get('.icon-search').realHover()
      cy.get('header form.search button').should('have.css', 'background-image', 'url("https://sustainablecottonhub.org/addons/default/themes/barometer2023/img/icons/search.svg")')
      cy.get('.icon-search').click()
      cy.get('.search-query').invoke('attr', 'placeholder').should('contain', 'Search a company / brand')
    });

    it('Input kata kunci pada text field Search', () => {
      cy.get('.icon-search').click()
      const input = cy.get(".search-query");
      input.type("IKEA Group (INGKA Holding BV)")
      cy.get('.ui-menu-item a').eq(0).contains("IKEA Group (INGKA Holding BV)")
    });

    it('Scroll up or down pada scrollbar list hasil searching', () => {
      cy.get('.icon-search').click()
      const input = cy.get(".search-query");
      input.type("AD")
      cy.get('.ui-menu-item').eq(0).trigger('keydown', { keyCode: 40 })
      cy.get('.ui-menu-item').eq(1).trigger('keydown', { keyCode: 40 })
      cy.get('.ui-menu-item').eq(2).trigger('keydown', { keyCode: 40 })
      cy.get('.ui-menu-item').eq(3).trigger('keydown', { keyCode: 40 })
      cy.get('body.noscroll').should('have.css', 'overflow', 'hidden')
    });

    it('Hover dan klik salah satu list yang dipilih', () => {
      cy.get('.icon-search').click()
      const input = cy.get(".search-query");
      input.type("AD")
      cy.get('.ui-menu-item a').eq(0).realHover()
      cy.get('.ui-menu .ui-menu-item a').should('have.css', 'color').and('be.colored', '#319044');
      cy.get('.ui-menu-item a').eq(0).click()
      //cy.url().should('eq','https://sustainablecottonhub.org/company-rankings#aditya-birla')
    });

    it('Hover dan klik pada icon Share', () => {
      cy.get('.icon-share').realHover()
      cy.get('.icon-share').then($els => {
        const win = $els[0].ownerDocument.defaultView
        const before = win.getComputedStyle($els[0], 'before')
        const contentValue = before.getPropertyValue('background-image')
        expect(contentValue).to.eq('url("https://sustainablecottonhub.org/addons/default/themes/barometer2023/img/icons/ic_share_green.svg")')
      })
      cy.get('.icon-share').click()
      cy.get('.modal-header').contains('Share this via')
      cy.get('[data-share-network="linkedin"]').should('be.visible')
      cy.get('[data-share-network="facebook"]').should('be.visible')
      cy.get('[data-share-network="twitter"]').should('be.visible')
      cy.get('.email').should('be.visible')

    });

    it('Hover dan klik share pada social media tersebut (LinkedIn, Facebook, Instagram, dan/atau Twitter)', () => {
      cy.get('.icon-share').click()
      cy.get('[data-share-network="linkedin"]').realHover()
      cy.get('[data-share-network="linkedin"]').should('have.css', 'border-top-color').and('be.colored', '#319044');
      cy.get('[data-share-network="facebook"]').realHover()
      cy.get('[data-share-network="facebook"]').should('have.css', 'border-top-color').and('be.colored', '#319044');
      cy.get('[data-share-network="twitter"]').realHover()
      cy.get('[data-share-network="twitter"]').should('have.css', 'border-top-color').and('be.colored', '#319044');
      //rgb(31, 112, 47)#1F702F#319044

      cy.get("#ShareModal .modal-dialog .list a").each(($li) => {
        cy.wait(5000)
        cy.get($li).invoke("attr", "target", "_blank").click()
        if ($li.attr('class') === "email") {
          cy.get($li).should('have.attr', 'href'
            , 'mailto:example@mail.com?subject=https://sustainablecottonhub.org/')
        } else {
          cy.get($li).should('have.attr', 'data-share-url', 'https://sustainablecottonhub.org/')
        }

      })

    });

    it('Hover dan klik share pada icon Email', () => {
      cy.wait(5000)
      cy.get('.icon-share').click()
      cy.get('.email').eq(0).realHover()
      cy.get('.email').eq(0).should('have.css', 'border-top-color').and('be.colored', '#319044');
      cy.get('.email').eq(0).invoke("attr", "target", "_blank").click()
      cy.get('.email').eq(0).should('have.attr', 'href'
        , 'mailto:example@mail.com?subject=https://sustainablecottonhub.org/')
    });

    it('Hover dan klik pada tombol Copy link untuk share', () => {
      cy.get('.icon-share').click()
      cy.get('#copyButton').click()
      cy.get('.copy-success').eq(0).should("be.visible")
    });

    it('Klik tombol Close pada pop up Share', () => {
      cy.get('.icon-share').click()
      cy.wait(5000)
      cy.get('[data-dismiss="modal"] > img').click()
      cy.get('.modal-content').should('not.be.visible')
    });

    it('Scroll down kemudian scroll up pada halaman', () => {
      cy.scrollTo('bottom')
      cy.wait(5000)
      cy.get('header').should('have.class', 'navbar-fixed-top scrollDown')
      cy.scrollTo('top')
      cy.wait(5000)
      cy.get('header').should('have.class', 'navbar-fixed-top')
    });

    it('Double click pada navigasi menu', () => {
      cy.get("nav .nav > li a").eq(0).dblclick();
      cy.url().should('eq', 'https://sustainablecottonhub.org/cotton-papers')
      cy.get("nav .nav > li a").eq(1).dblclick();
      cy.url().should('eq', 'https://sustainablecottonhub.org/cotton-rankings')
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.get("nav .nav > li a").eq(2).dblclick();
      cy.url().should('eq', 'https://sustainablecottonhub.org/recommendations')
      // cy.get("nav .nav > li a").eq(3).dblclick();
      // cy.url().should('eq','https://cotton.staging.catalyze.id/certification-benchmarking')
      cy.get("nav .nav > li a").eq(3).dblclick();
      cy.url().should('eq', 'https://sustainablecottonhub.org/contact')
    });

    it('Input company/brand yang tidak ada di database (No result), pada text field Search', () => {
      cy.get('.icon-search').click()
      const input = cy.get(".search-query");
      input.type("dfssdfsf")
      cy.get('.ui-menu-item a').eq(0).contains("Sorry, we did not assess this company")

    });

    it('Scroll down kemudian scroll up pada halaman, lalu scroll down kembali', () => {
      cy.scrollTo('bottom')
      cy.wait(5000)
      cy.get('header').should('have.class', 'navbar-fixed-top scrollDown')
      cy.scrollTo('top')
      cy.wait(5000)
      cy.get('header').should('have.class', 'navbar-fixed-top')
      cy.scrollTo('bottom')
      cy.wait(5000)
      cy.get('header').should('have.class', 'navbar-fixed-top scrollDown')
      cy.wait(7000)
    });

  })
})
