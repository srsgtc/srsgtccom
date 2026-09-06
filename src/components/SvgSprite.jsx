export default function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="i-arrow-r" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" /></symbol>
      <symbol id="i-up-right" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></symbol>
      <symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 3h3l1.6 4.1-2.1 1.5a12.5 12.5 0 0 0 6.3 6.3l1.5-2.1L21 14.4v3A2.6 2.6 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3Z" /></symbol>
      <symbol id="i-wa" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.4L3 21l4.8-1.2A9 9 0 1 0 12 3Z" /><path d="M9 8.4c.3 2.7 3.9 6.3 6.6 6.6l1-1.7-2.2-1.4-1.2.6a6.6 6.6 0 0 1-1.7-1.7l.6-1.2-1.4-2.2-1.7 1Z" /></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4.5 7.5 7.5 5.6 7.5-5.6" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" /><circle cx="12" cy="10" r="2.6" /></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 9h16M4 15h16" /></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></symbol>
      <symbol id="i-chev-l" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7" /></symbol>
      <symbol id="i-chev-r" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></symbol>
      <symbol id="topo" viewBox="0 0 600 600">
        <path className="contour" d="M300 82 C398 78 496 142 512 240 C528 340 462 434 362 462 C262 490 148 458 106 366 C66 276 96 164 176 116 C216 92 258 84 300 82 Z" />
        <path className="contour" d="M302 124 C382 122 462 176 476 254 C490 336 436 410 354 434 C270 458 176 432 142 356 C108 282 134 190 200 150 C234 130 268 125 302 124 Z" />
        <path className="contour" d="M304 166 C368 164 430 208 442 268 C454 330 412 388 348 406 C282 426 206 404 180 346 C154 290 174 216 226 184 C252 168 278 166 304 166 Z" />
        <path className="contour" d="M306 208 C354 206 398 240 408 284 C418 326 388 366 342 378 C294 392 236 376 216 336 C196 296 210 242 250 218 C268 208 288 208 306 208 Z" />
        <path className="contour" d="M308 250 C340 248 368 272 374 300 C380 328 362 348 334 354 C302 362 264 352 252 326 C240 300 250 268 276 256 C286 251 296 250 308 250 Z" />
        <circle cx="300" cy="300" r="3" fill="currentColor" />
        <text className="smap-lt" x="316" y="288">121.5</text>
        <text className="smap-lt" x="382" y="212">118.0</text>
        <text className="smap-lt" x="180" y="420">114.2</text>
        <path className="contour" strokeDasharray="4 5" d="M60 520 C160 470 240 540 340 496 C420 462 500 500 560 468" />
      </symbol>
      <symbol id="mark" viewBox="0 0 42 42">
        <rect width="42" height="42" fill="#0F2A43" />
        <path d="M5 15c5-4 9-1 13-4s8-2 12-5" stroke="#FFFFFF" strokeOpacity=".38" strokeWidth="2" fill="none" />
        <path d="M5 23c5-4 9-1 13-4s8-2 12-5" stroke="#FFFFFF" strokeOpacity=".62" strokeWidth="2" fill="none" />
        <path d="M5 31c5-4 9-1 13-4s8-2 12-5" stroke="#FFFFFF" strokeOpacity=".38" strokeWidth="2" fill="none" />
        <path d="M21 5v24" stroke="#E85D04" strokeWidth="2.6" />
        <path d="M21 36l-4.5-6h9L21 36Z" fill="#E85D04" />
      </symbol>
    </svg>
  );
}