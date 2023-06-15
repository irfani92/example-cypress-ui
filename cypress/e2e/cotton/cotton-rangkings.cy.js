describe('Cotton Papers', () => { 
    describe('Memastikan halaman Cotton Rankings berhasil ditampilkan dan berfungsi dengan baik sesuai desain yang ada', () => { 
      beforeEach(() => {
        cy.viewport(1920, 1280)
        cy.visit('/cotton-rankings')
        cy.general();
      })
  
      it('Akses halaman Cotton Rankings', () => { 
          cy.get('header').should("be.visible")
          cy.get('.banner').should("be.visible")
          cy.get('.banner > .content > .container > h1').contains('Cotton Rankings')
          cy.get('.banner > .content > .container > h6').should("be.visible")
          cy.get('section.rankings').should('have.css', 'background-color').and('be.colored', '#F2F1EC');
          cy.get('h2.text-center').contains('Retailers and Brands Performance')
          cy.get('.score > .dropdown > .dropdown-toggle > .title').contains('Score')
          cy.get('.company-name > .dropdown > .dropdown-toggle > .title').contains('Company Name')
          cy.get('.breakdown > .dropdown > .dropdown-toggle > .title').contains('breakdown')
          cy.get('#decathlon-group > .list > .score').should("be.visible")
          cy.get('#decathlon-group > .list > .list-detail > .company-name > span').should("be.visible")
          cy.get('#decathlon-group > .list > .list-detail > .breakdown').should("be.visible")
          cy.get('#decathlon-group > .list > .list-detail > .see-detail > .collapse-toggle').should("be.visible")
          cy.get('#decathlon-group > .list > .list-detail > .see-detail > .collapse-toggle').click()
          cy.get('#company-48 > .panel-body > .notable-brand > .content').should("be.visible")
          cy.get(':nth-child(4) > .button').should("be.visible")
          cy.get('.legends > .legend-card > :nth-child(1) > :nth-child(2)').should("be.visible")
          cy.get('.legend-card > :nth-child(1) > :nth-child(3)').should("be.visible")
          cy.get('.legends > .previous-links > [href="https://sustainablecottonranking.org/check-the-scores#2020"] > span').should("be.visible")
          cy.get('.info .collapsable-area#howToRead ').should('have.css', 'background-color').and('be.colored', '#013042');
          cy.get('.info').should('have.css', 'background-color').and('be.colored', '#fff');
          cy.scrollTo('bottom')
          cy.wait(5000)
          cy.get('footer').should("be.visible")
      });
  
      it('Lihat pada semua warna score yang ada', () => {
        cy.get('.legends > .legend-card .text').each(($btn) => {
            const textValue = $btn.text().replace('%','') 
          
            if (textValue.indexOf('.') > -1) { 
                let result = textValue.split('.')[1].trim().length;
                expect(result).to.eq(1)
            }
            if (textValue == "0") {
                const win = $btn[0].ownerDocument.defaultView
                const before = win.getComputedStyle($btn[0].previousSibling, null)
                const contentValue = before.getPropertyValue('background-color')
                expect(contentValue).to.eq(hexToRgbA('#9C112B'))
            }
            if (textValue == "Not Clear") {
                const win = $btn[0].ownerDocument.defaultView
                const before = win.getComputedStyle($btn[0].previousSibling, null)
                const contentValue = before.getPropertyValue('background-color')
                expect(contentValue).to.eq(hexToRgbA('#B4B3B3'))
            }
            if (textValue == "80") {
                console.log($btn[0].previousSibling.getAttribute("src"));
                if ($btn[0].previousSibling.getAttribute("src") 
                == 'https://cotton.staging.catalyze.id/addons/default/themes/barometer2023/img/icons/ic_less-than.svg') {
                    const win = $btn[0].ownerDocument.defaultView
                    const before = win.getComputedStyle($btn[0].previousSibling, null)
                    const contentValue = before.getPropertyValue('background-color')
                    expect(contentValue).to.eq(hexToRgbA('#DD4F12'))
                }
            
                if ($btn[0].previousSibling.getAttribute("src") 
                == 'https://cotton-qa.staging.catalyze.id/addons/default/themes/barometer2023/img/icons/ic_greater-than-equal-to.svg') {
                    const win = $btn[0].ownerDocument.defaultView
                    const before = win.getComputedStyle($btn[0].previousSibling.previousSibling, null)
                    const contentValue = before.getPropertyValue('background-color')
                    expect(contentValue).to.eq(hexToRgbA('#D08C07'))
                }
            }
            if (textValue == "90") {
                if ($btn[0].previousSibling.getAttribute("src") 
                == 'https://cotton-qa.staging.catalyze.id/addons/default/themes/barometer2023/img/icons/ic_greater-than-equal-to.svg') {
                    const win = $btn[0].ownerDocument.defaultView
                    const before = win.getComputedStyle($btn[0].previousSibling.previousSibling, null)
                    const contentValue = before.getPropertyValue('background-color')
                    expect(contentValue).to.eq(hexToRgbA('#779C11'))
                }
            }

            if (textValue == "99") {
                if ($btn[0].previousSibling.getAttribute("src") 
                == 'https://cotton-qa.staging.catalyze.id/addons/default/themes/barometer2023/img/icons/ic_greater-than-equal-to.svg') {
                    const win = $btn[0].ownerDocument.defaultView
                    const before = win.getComputedStyle($btn[0].previousSibling.previousSibling, null)
                    const contentValue = before.getPropertyValue('background-color')
                    expect(contentValue).to.eq(hexToRgbA('#3A6110'))
                }
            }
          })
      });
  
      it('Lihat pada semua percentage bar', () => {
      
      });
  
      it('Hover dan klik pada salah satu tombol chevron See Details', () => {
         
      });
  
      it('Klik tombol Hide Details pada score list yang terbuka', () => {
        cy.get('#decathlon-group > .list > .list-detail > .see-detail > .collapse-toggle').click()
        cy.get('#company-48 > .panel-body').should('be.visible')
        cy.wait(5000)
        cy.get('#decathlon-group > .list > .list-detail > .see-detail > .collapse-toggle').click()
        cy.get('#company-48 > .panel-body').should('not.be.visible')
      });
  
      it('Hover dan klik pada tombol View All', () => {
        cy.scrollTo('bottom')
        cy.wait(7000)
        cy.get(':nth-child(4) > .button').realHover()
        cy.get(':nth-child(4) > .button').should('have.css', 'background-color').and('be.colored', '#277135');
        cy.wait(5000)
        cy.get(':nth-child(4) > .button').click()
        cy.get('#zalando-se > .list').should('be.visible')
      });
  
      it('Hover dan klik tombol How To Read The Rankings pada Sidebar Legend', () => {
        cy.scrollTo(0, 500)
        cy.wait(5000)
        cy.get('.legends > .legend-card > .button').realHover({scrollBehavior : false})
        cy.get('.legends > .legend-card > .button').should('have.css', 'background-color').and('be.colored', '#277135');
        cy.wait(5000)
        cy.get('.legends > .legend-card > .button').click()
      });
  
      it('Hover dan klik salah satu hyperlink pada Previous Years Cotton Rankings', () => { 
        cy.scrollTo(0, 500)
        cy.wait(5000)
        cy.get('.legends > .previous-links > a').each(($btn) => {
            cy.wait(7000)
            cy.get($btn).realHover({scrollBehavior : false})
            cy.get($btn).should('have.css','text-decoration','none solid rgb(49, 144, 68)')
            cy.get($btn).should('have.css','color').and('be.colored', '#319044')
            let year = $btn.text().substr($btn.text().length - 4)
            cy.get($btn).click({ scrollBehavior : false})
            cy.get($btn).invoke('attr', 'href').should('eq','https://sustainablecottonranking.org/check-the-scores#'+year+'')
          })
      });
  
      it('Klik pada filter Score', () => {
        cy.get('.score > .dropdown > .dropdown-toggle > .title').click()
        cy.get('.score > .dropdown > .dropdown-menu > li > a.sort').eq(0).contains('Ascending')
        cy.get('.score > .dropdown > .dropdown-menu > li > a.sort').eq(1).contains('Descending')
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).contains('>= 99%')
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(1).contains('>= 90%')
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(2).contains('>= 80%')
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(3).contains('< 80%')
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(4).contains('Not Clear')
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(5).contains('0%')
        cy.get('.score > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').contains('confirm')
        cy.get('.score > .dropdown > .dropdown-menu > li > .link-area > div >a.button.reset').contains('reset')
      });

      it('Klik pada filter Company Name', () => {
        cy.get('.company-name > .dropdown > .dropdown-toggle > .title').click()
        cy.get('.company-name > .dropdown > .dropdown-menu > li > a.sort').eq(0).contains('A to Z')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > a.sort').eq(1).contains('Z to A')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .inner-list').should('be.visible')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).contains(' ASICS')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .inner-list').scrollTo('bottom')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').contains('confirm')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .link-area > div >a.button.reset').contains('reset')
      });

      it('Klik pada filter Breakdown', () => {
        cy.get('.breakdown > .dropdown > .dropdown-toggle > .title').click()
        cy.get('.dropdown-menu > :nth-child(2) > .inner-list > [data-id="yes"]').contains('Yes')
        cy.get('.dropdown-menu > :nth-child(2) > .inner-list > [data-id="no"]').contains('No')
        cy.get('.dropdown-menu > :nth-child(4) > .inner-list > [data-id="bc"]').contains('Better Cotton or equivalent')
        cy.get('.dropdown-menu > :nth-child(4) > .inner-list > [data-id="or"]').contains('Organic')
        cy.get('.dropdown-menu > :nth-child(4) > .inner-list > [data-id="re"]').contains('Recycled')
        cy.get('.dropdown-menu > :nth-child(4) > .inner-list > [data-id="other"]').contains('Other')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').contains('confirm')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .link-area > div >a.button.reset').contains('reset')
      });

      it('Hover/klik pada salah satu pilihan filter/sort', () => {
        cy.get('.score > .dropdown > .dropdown-toggle > .title').click()
        cy.wait(5000)
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).realHover({scrollBehavior : false})
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).should('have.css','background-color','rgba(49, 144, 68, 0.14)')
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).click()
        cy.get('.score > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).should('have.css','color').and('be.colored', '#319044')
        cy.wait(5000)
        cy.get('.score > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').realHover()
        cy.get('.score > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').should('have.css','background-color').and('be.colored', '#277135')
        cy.wait(5000)
        cy.get('.score > .dropdown > .dropdown-menu > li > .link-area > div >a.button.reset').realHover() 
        cy.get('.score > .dropdown > .dropdown-menu > li > .link-area > div >a.button.reset').should('have.css','background-color').and('be.colored', '#319044')
      });

      it.only('Hover dan klik pada tombol Confirm setelah pilih salah satu filter/sort', () => {
        cy.get('.company-name > .dropdown > .dropdown-toggle > .title').click()
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).click()
        cy.wait(5000)
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').realHover()
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').should('have.css','background-color').and('be.colored', '#277135')
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .link-area > div >a.button.confirm').click()
        cy.get('.company-name > .dropdown > .dropdown-menu > li > .inner-list > li').eq(0).contains(' ASICS')
      });

      it('Hover dan klik pada tombol Reset pada filter/sort', () => {
        
      });

      it('Scroll down pada halaman Cotton Rankings', () => {
        cy.scrollTo(0, 1000,{duration : 3000})
        cy.wait(5000)
        cy.get('.header').should('have.class','is-sticky')
      });

      it('Scroll down kemudian scroll up pada halaman Cotton Rankings', () => {
        cy.scrollTo('bottom',{duration : 3000})
        cy.wait(5000)
        cy.scrollTo(0, 1000,{duration : 1000})
        cy.get('.header').should('have.class','is-sticky')
      });

      it('Klik tombol Read More (+) pada How To Read The Rankings dan/atau How We Did The Research', () => {
        cy.scrollTo('bottom')
        cy.wait(5000)
        cy.get(':nth-child(1) > [data-target="#HowtoReadtheRankings"]').click()
        cy.get('#HowtoReadtheRankings > .body > h5').should('be.visible')
        cy.get(':nth-child(1) > [data-target="#HowWeDidTheResearch"]').click()
        cy.get('#HowWeDidTheResearch > .body > h5').should('be.visible')
      });

      it('Klik tombol Read Less (-) pada konten yang terbuka tersebut', () => {
        cy.scrollTo('bottom')
        cy.wait(5000)
        cy.get(':nth-child(1) > [data-target="#HowtoReadtheRankings"]').click()
        cy.wait(5000)
        cy.get(':nth-child(1) > [data-target="#HowtoReadtheRankings"]').click()
        cy.get('#HowtoReadtheRankings > .body > h5').should('not.be.visible')
        cy.get(':nth-child(1) > [data-target="#HowWeDidTheResearch"]').click()
        cy.wait(5000)
        cy.get(':nth-child(1) > [data-target="#HowWeDidTheResearch"]').click()
        cy.get('#HowWeDidTheResearch > .body > h5').should('not.be.visible')
        
      });

      it('Klik kanan pada tombol View All (manual)', () => {
        cy.get(':nth-child(4) > .button').rightclick()
        expect(performance.navigation.type).to.not.equal(performance.navigation.TYPE_RELOAD);
      });

      it('Filter/sort pada Score list yang tidak ada data (No Result)', () => {
        
      });
    })
  })
  
  function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(', ')+')';
    }
    throw new Error('Bad Hex');
}

  
  