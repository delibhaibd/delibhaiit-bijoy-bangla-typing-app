export const getFingerTransform = (key, isLeft, fingerName) => {
    if (!key) return 'translateY(0)';

    // Key mappings to determine reach
    const k = key.toLowerCase();

    // Default column for each finger (straight up/down)
    // Left: pinky(1,q,a,z), ring(2,w,s,x), middle(3,e,d,c), index(4,r,f,v)
    // Right: index(7,u,j,m), middle(8,i,k,,), ring(9,o,l,.), pinky(0,p,;,/)
    
    // Vertical reach (rows)
    let y = 0;
    if (['`','1','2','3','4','5','6','7','8','9','0','-','=','~','!','@','#','$','%','^','&','*','(',')','_','+','backspace'].includes(k) || key === 'Backspace') {
        y = -40; // Number row
    } else if (['q','w','e','r','t','y','u','i','o','p','[',']','\\','{','}','|','tab'].includes(k) || key === 'Tab') {
        y = -20; // QWERTY row
    } else if (['a','s','d','f','g','h','j','k','l',';',"'",':','"','capslock','enter'].includes(k) || key === 'Enter' || key === 'CapsLock') {
        y = 0;   // ASDF row
    } else if (['z','x','c','v','b','n','m',',','.','/','<','>','?','shift','control','alt'].includes(k) || key === 'Shift' || key === 'Control' || key === 'Alt') {
        y = 20;  // ZXCV row
    }

    if (fingerName === 'thumb') {
        return `translateY(20px)`; // Thumbs press spacebar which is below
    }

    // Horizontal reach (diagonals)
    let x = 0;
    if (isLeft && fingerName === 'index') {
        if (['5','t','g','b','%','T','G','B'].includes(key)) {
            x = 15; // Reach right
        }
    } else if (!isLeft && fingerName === 'index') {
        if (['6','y','h','n','^','Y','H','N'].includes(key)) {
            x = -15; // Reach left
        }
    } else if (!isLeft && fingerName === 'pinky') {
        if (['-','_','[','{',"'",'"'].includes(key)) {
            x = 15;
        } else if (['=','+',']','}','enter'].includes(k) || key === 'Enter') {
            x = 30;
        } else if (['\\','|','backspace'].includes(k) || key === 'Backspace') {
            x = 45;
        }
    } else if (isLeft && fingerName === 'pinky') {
        if (['`','~','tab','capslock','shift','control'].includes(k) || key === 'Tab' || key === 'Shift' || key === 'CapsLock' || key === 'Control') {
            x = -15; // Left reach for meta keys
        }
    }

    // If this finger is active, apply the transform
    // We add a slight scale down if it reaches far, to simulate 3D depth, but simple translate is usually enough
    return `translate(${x}px, ${y}px)`;
};
