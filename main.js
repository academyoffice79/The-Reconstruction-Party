/* Small script to improve in-page navigation UX
    - Ensures clicking an in-page nav link always scrolls to the target (even if the hash is unchanged)
    - Closes the mobile nav (unchecks the nav-toggle checkbox) after navigation
    - Keeps the implementation tiny and focused; no external deps
*/

(function(){
      function handleNavClick(e){
         const anchor = e.target.closest('a[href^="#"]');
         if(!anchor) return;
         const href = anchor.getAttribute('href');
         if(!href || href === '#') return;

         const id = href.slice(1);
         const target = document.getElementById(id);
         if(!target) return; // leave browser default if target missing

         // Prevent default jump; perform smooth scroll so repeated clicks always scroll
         e.preventDefault();

         // Calculate offset so the target's heading isn't hidden behind the sticky navbar
         const navbar = document.querySelector('.navbar');
         const navbarHeight = navbar ? Math.ceil(navbar.getBoundingClientRect().height) : 0;
         const extraBuffer = 8; // pixels of extra space below the navbar
         const targetTop = window.scrollY + target.getBoundingClientRect().top;
         const scrollTo = Math.max(0, targetTop - navbarHeight - extraBuffer);

         window.scrollTo({ top: scrollTo, behavior: 'smooth' });

         // Update the URL hash without causing another jump
         try { history.replaceState(null, '', href); } catch (err) { /* ignore */ }

         // If mobile menu is open (checkbox used for CSS toggle), close it
         const toggle = document.querySelector('.nav-toggle-input');
         if(toggle && toggle.checked){
            toggle.checked = false;
         }
      }

   document.addEventListener('click', handleNavClick, { passive: false });
})();