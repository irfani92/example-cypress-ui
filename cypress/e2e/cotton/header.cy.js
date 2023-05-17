import rgbHex from 'rgb-hex';
describe('Header', () => { 
  describe('Memastikan bahwa header website terdiri dari navigasi (menu ataupun submenu) sesuai desain yang ada dan berhasil direct ke page yang dimaksud ketika diklik', () => { 
    beforeEach(() => {
      cy.viewport(1920, 1280)
      cy.baseUrl()
      cy.general();
    })

    it('Lihat header website', () => { 
      cy.get('.logo > img').should('have.attr', 'src').should('include','logo.png')
      cy.get('.top-header > .sponsored > [href="http://www.pan-uk.org/"] > img')
        .should('have.attr', 'src').should('include','pan@2x.png')
      cy.get('.top-header > .sponsored > [href="https://www.solidaridadnetwork.org/"] > img')
        .should('have.attr', 'src').should('include','solidaridad@2x.png')
      cy.get('.first > .gtm-top-nav').contains('Cotton Barometer')
      cy.get('nav .nav > li a').eq(1).contains('company rankings')
      cy.get('nav .nav > li a').eq(2).contains('Recommendations')
      cy.get('nav .nav > li a').eq(3).contains('Contact')
      cy.get('.icon-search').should("be.visible")
      cy.get('.icon-share').should("be.visible")
    });

    it.only('Klik pada Title COTTONBAROMETER', () => {
      cy.get('.logo > img').click()
      cy.url().should('eq','https://cotton.staging.catalyze.id/')
    });

    it('Klik pada logo Pesticide Action Network UK', () => {
      cy.get('.sponsored a').eq(0).invoke("attr", "target", "_blank").click()
      cy.get('.sponsored a').eq(0).should('have.attr','href','http://www.pan-uk.org/')
    });

    it('Klik pada logo Solidaridad', () => {
      cy.get('.sponsored a').eq(1).invoke("attr", "target", "_blank").click()
      cy.get('.sponsored a').eq(1).should('have.attr','href','https://www.solidaridadnetwork.org/')
    });

    it('Hover dan klik pada menu Cotton Barometer', () => {
      cy.get("nav .nav > li a").eq(0).should('have.css', 'color').and('be.colored', '#555555');
      cy.get("nav .nav > li a").eq(0).realHover();
      cy.get("nav .nav > li a").eq(0).should('have.css', 'color').and('be.colored', '#319044');
    });

    it('Hover dan klik pada menu Company Rankings', () => {
      cy.get("nav .nav > li a").eq(1).should('have.css', 'color').and('be.colored', '#555555');
      cy.get("nav .nav > li a").eq(1).realHover();
      cy.get("nav .nav > li a").eq(1).should('have.css', 'color').and('be.colored', '#319044');
    });

    it('Hover dan klik pada menu Recommendations', () => {
      cy.get("nav .nav > li a").eq(2).should('have.css', 'color').and('be.colored', '#555555');
      cy.get("nav .nav > li a").eq(2).realHover();
      cy.get("nav .nav > li a").eq(2).should('have.css', 'color').and('be.colored', '#319044');
    });

    it('Hover dan klik pada menu Contact', () => {
      cy.get("nav .nav > li a").eq(3).should('have.css', 'color').and('be.colored', '#555555');
      cy.get("nav .nav > li a").eq(3).realHover();
      cy.get("nav .nav > li a").eq(3).should('have.css', 'color').and('be.colored', '#319044');
    });

    it('Hover dan klik pada icon Search', () => {
      cy.get('.icon-search').realHover()
      cy.get('header form.search button').should('have.css', 'background-image','url("https://cotton.staging.catalyze.id/addons/default/themes/barometer2023/img/icons/search.svg")')
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
      cy.get('body.noscroll').should('have.css','overflow','hidden')
    });

    it('Hover dan klik salah satu list yang dipilih', () => {
      cy.get('.icon-search').click()
      const input = cy.get(".search-query");
      input.type("AD")
      cy.get('.ui-menu-item a').eq(0).realHover()
      cy.get('.ui-menu .ui-menu-item a').should('have.css', 'color').and('be.colored', '#319044');
      cy.get('.ui-menu-item a').eq(0).click()
      cy.url().should('eq','https://cotton.staging.catalyze.id/company-rankings#aditya-birla')
    });

    it('Hover dan klik pada icon Share', () => {
      cy.get('.icon-share').realHover()
      cy.get('.icon-share').then($els => {
        const win = $els[0].ownerDocument.defaultView
        const before = win.getComputedStyle($els[0], 'before')
        const contentValue = before.getPropertyValue('background-image')
        expect(contentValue).to.eq('url("https://cotton.staging.catalyze.id/addons/default/themes/barometer2023/img/icons/ic_share_green.svg")')
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
      //cy.get('#ShareModal .modal-dialog .list a').eq(0).realHover('mouse') 
     // cy.get('#ShareModal .modal-dialog .list a').eq(0).should('have.css','border','1px')
      //.and('be.colored','#1F702F')rgb(31, 112, 47) rgb(153, 176, 188)
     cy.get('#ShareModal .modal-dialog .list a').eq(0).within(($el) => {
      cy.window().then((win) => {
        const befores = win.getComputedStyle($el[0],"before") 
        console.log(befores);
         const width = befores.getPropertyValue("border");
         //expect(width).to.equal("60px");
      });
    });
   
      cy.get('#ShareModal .modal-dialog .list a').eq(0).realHover().then($els => {
        const win = $els[0].ownerDocument.defaultView
        console.log(win.getComputedStyle($els[0], 'before').border);
        // const before = win.getComputedStyle($els[0], '::before');
        // console.log(before.borderBottomColor);
        // const contentValue = before.getPropertyValue('border')
        // cy.log(before.getPropertyValue('border-top-color'))
        // cy.log(rgbHex(contentValue))
        //expect(rgbHex(contentValue)).to.eq('1F702F'); 
      })   
      
    });

    it('Hover dan klik share pada icon Email', () => {
      
    });

    it('Hover dan klik pada tombol Copy link untuk share', () => {
      
    });

    it('Buka pada new tab dan paste link tersebut, kemudian Enter', () => {
    
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
      cy.get('header').should('have.class','navbar-fixed-top scrollDown')
      cy.scrollTo('top')
      cy.wait(5000)
      cy.get('header').should('have.class','navbar-fixed-top')
    });

    it('Double click pada navigasi menu', () => {
      cy.get("nav .nav > li a").eq(0).dblclick();
      cy.url().should('eq','https://cotton.staging.catalyze.id/cotton-barometer')
      cy.get("nav .nav > li a").eq(1).dblclick();
      cy.url().should('eq','https://cotton.staging.catalyze.id/company-rankings')
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.get("nav .nav > li a").eq(2).dblclick();
      cy.url().should('eq','https://cotton.staging.catalyze.id/recommendations')
      cy.get("nav .nav > li a").eq(3).dblclick();
      cy.url().should('eq','https://cotton.staging.catalyze.id/certification-benchmarking')
      cy.get("nav .nav > li a").eq(4).dblclick();
      cy.url().should('eq','https://cotton.staging.catalyze.id/contact')
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
      cy.get('header').should('have.class','navbar-fixed-top scrollDown')
      cy.scrollTo('top')
      cy.wait(5000)
      cy.get('header').should('have.class','navbar-fixed-top')
      cy.scrollTo('bottom')
      cy.wait(5000)
      cy.get('header').should('have.class','navbar-fixed-top scrollDown')
    });

  })
})
