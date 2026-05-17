Update the logo wordmark in `src/components/Navbar.tsx` so the word "The" matches the styling of "Styling" (italic serif, gold accent).

Currently:
```
THE BROTHER'S <span class="text-gold italic font-serif font-semibold">Styling</span>
```

Change to wrap "The" in the same serif/italic/gold span, keeping "BROTHER'S" in the display font:
```
<span class="text-gold italic font-serif font-semibold">The</span> BROTHER'S <span class="text-gold italic font-serif font-semibold">Styling</span>
```

Apply the same change to the mobile menu header inside the same file.

No other files affected.