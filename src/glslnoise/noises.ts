export const cellular2D = `
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec3 mod7(vec3 x) {
    return x - floor(x * (1.0 / 7.0)) * 7.0;
  }
  vec3 permute(vec3 x) {
    return mod289((34.0 * x + 1.0) * x);
  }
  vec2 cellular(vec2 P) {
  #define K 0.142857142857
  #define Ko 0.428571428571
  #define jitter 1.0
      vec2 Pi = mod289(floor(P));
       vec2 Pf = fract(P);
      vec3 oi = vec3(-1.0, 0.0, 1.0);
      vec3 of = vec3(-0.5, 0.5, 1.5);
      vec3 px = permute(Pi.x + oi);
      vec3 p = permute(px.x + Pi.y + oi);
      vec3 ox = fract(p*K) - Ko;
      vec3 oy = mod7(floor(p*K))*K - Ko;
      vec3 dx = Pf.x + 0.5 + jitter*ox;
      vec3 dy = Pf.y - of + jitter*oy;
      vec3 d1 = dx * dx + dy * dy;
      p = permute(px.y + Pi.y + oi);
      ox = fract(p*K) - Ko;
      oy = mod7(floor(p*K))*K - Ko;
      dx = Pf.x - 0.5 + jitter*ox;
      dy = Pf.y - of + jitter*oy;
      vec3 d2 = dx * dx + dy * dy;
      p = permute(px.z + Pi.y + oi);
      ox = fract(p*K) - Ko;
      oy = mod7(floor(p*K))*K - Ko;
      dx = Pf.x - 1.5 + jitter*ox;
      dy = Pf.y - of + jitter*oy;
      vec3 d3 = dx * dx + dy * dy;
      vec3 d1a = min(d1, d2);
      d2 = max(d1, d2);
      d2 = min(d2, d3);
      d1 = min(d1a, d2);
      d2 = max(d1a, d2);
      d1.xy = (d1.x < d1.y) ? d1.xy : d1.yx;
      d1.xz = (d1.x < d1.z) ? d1.xz : d1.zx;
      d1.yz = min(d1.yz, d2.yz);
      d1.y = min(d1.y, d1.z);
      d1.y = min(d1.y, d2.x);
      return sqrt(d1.xy);
  }
`;

export const cellular2x2 = `
  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod7(vec4 x) {
    return x - floor(x * (1.0 / 7.0)) * 7.0;
  }
  vec4 permute(vec4 x) {
    return mod289((34.0 * x + 1.0) * x);
  }
  vec2 cellular2x2(vec2 P) {
  #define K 0.142857142857
  #define K2 0.0714285714285
  #define jitter 0.8
      vec2 Pi = mod289(floor(P));
       vec2 Pf = fract(P);
      vec4 Pfx = Pf.x + vec4(-0.5, -1.5, -0.5, -1.5);
      vec4 Pfy = Pf.y + vec4(-0.5, -0.5, -1.5, -1.5);
      vec4 p = permute(Pi.x + vec4(0.0, 1.0, 0.0, 1.0));
      p = permute(p + Pi.y + vec4(0.0, 0.0, 1.0, 1.0));
      vec4 ox = mod7(p)*K+K2;
      vec4 oy = mod7(floor(p*K))*K+K2;
      vec4 dx = Pfx + jitter*ox;
      vec4 dy = Pfy + jitter*oy;
      vec4 d = dx * dx + dy * dy;
  #if 0
      d.xy = min(d.xy, d.zw);
      d.x = min(d.x, d.y);
      return vec2(sqrt(d.x));
  #else
      d.xy = (d.x < d.y) ? d.xy : d.yx;
      d.xz = (d.x < d.z) ? d.xz : d.zx;
      d.xw = (d.x < d.w) ? d.xw : d.wx;
      d.y = min(d.y, d.z);
      d.y = min(d.y, d.w);
      return sqrt(d.xy);
  #endif
  }
`;
export const cellular2x2x2 = `
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod7(vec4 x) {
    return x - floor(x * (1.0 / 7.0)) * 7.0;
  }
  vec3 permute(vec3 x) {
    return mod289((34.0 * x + 1.0) * x);
  }
  vec4 permute(vec4 x) {
    return mod289((34.0 * x + 1.0) * x);
  }
  vec2 cellular2x2x2(vec3 P) {
  #define K 0.142857142857
  #define Ko 0.428571428571
  #define K2 0.020408163265306
  #define Kz 0.166666666667
  #define Kzo 0.416666666667
  #define jitter 0.8
      vec3 Pi = mod289(floor(P));
       vec3 Pf = fract(P);
      vec4 Pfx = Pf.x + vec4(0.0, -1.0, 0.0, -1.0);
      vec4 Pfy = Pf.y + vec4(0.0, 0.0, -1.0, -1.0);
      vec4 p = permute(Pi.x + vec4(0.0, 1.0, 0.0, 1.0));
      p = permute(p + Pi.y + vec4(0.0, 0.0, 1.0, 1.0));
      vec4 p1 = permute(p + Pi.z);
      vec4 p2 = permute(p + Pi.z + vec4(1.0));
      vec4 ox1 = fract(p1*K) - Ko;
      vec4 oy1 = mod7(floor(p1*K))*K - Ko;
      vec4 oz1 = floor(p1*K2)*Kz - Kzo;
      vec4 ox2 = fract(p2*K) - Ko;
      vec4 oy2 = mod7(floor(p2*K))*K - Ko;
      vec4 oz2 = floor(p2*K2)*Kz - Kzo;
      vec4 dx1 = Pfx + jitter*ox1;
      vec4 dy1 = Pfy + jitter*oy1;
      vec4 dz1 = Pf.z + jitter*oz1;
      vec4 dx2 = Pfx + jitter*ox2;
      vec4 dy2 = Pfy + jitter*oy2;
      vec4 dz2 = Pf.z - 1.0 + jitter*oz2;
      vec4 d1 = dx1 * dx1 + dy1 * dy1 + dz1 * dz1;
      vec4 d2 = dx2 * dx2 + dy2 * dy2 + dz2 * dz2;
  #if 0
      d1 = min(d1, d2);
      d1.xy = min(d1.xy, d1.wz);
      d1.x = min(d1.x, d1.y);
      return vec2(sqrt(d1.x));
  #else
      vec4 d = min(d1,d2);
      d2 = max(d1,d2);
      d.xy = (d.x < d.y) ? d.xy : d.yx;
      d.xz = (d.x < d.z) ? d.xz : d.zx;
      d.xw = (d.x < d.w) ? d.xw : d.wx;
      d.yzw = min(d.yzw, d2.yzw);
      d.y = min(d.y, d.z);
      d.y = min(d.y, d.w);
      d.y = min(d.y, d2.x);
      return sqrt(d.xy);
  #endif
  }
`;

export const cellular3D = `
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec3 mod7(vec3 x) {
    return x - floor(x * (1.0 / 7.0)) * 7.0;
  }
  vec3 permute(vec3 x) {
    return mod289((34.0 * x + 1.0) * x);
  }
  vec2 cellular(vec3 P) {
  #define K 0.142857142857
  #define Ko 0.428571428571
  #define K2 0.020408163265306
  #define Kz 0.166666666667
  #define Kzo 0.416666666667
  #define jitter 1.0

      vec3 Pi = mod289(floor(P));
    vec3 Pf = fract(P) - 0.5;

      vec3 Pfx = Pf.x + vec3(1.0, 0.0, -1.0);
      vec3 Pfy = Pf.y + vec3(1.0, 0.0, -1.0);
      vec3 Pfz = Pf.z + vec3(1.0, 0.0, -1.0);

      vec3 p = permute(Pi.x + vec3(-1.0, 0.0, 1.0));
      vec3 p1 = permute(p + Pi.y - 1.0);
      vec3 p2 = permute(p + Pi.y);
      vec3 p3 = permute(p + Pi.y + 1.0);

      vec3 p11 = permute(p1 + Pi.z - 1.0);
      vec3 p12 = permute(p1 + Pi.z);
      vec3 p13 = permute(p1 + Pi.z + 1.0);

      vec3 p21 = permute(p2 + Pi.z - 1.0);
      vec3 p22 = permute(p2 + Pi.z);
      vec3 p23 = permute(p2 + Pi.z + 1.0);

      vec3 p31 = permute(p3 + Pi.z - 1.0);
      vec3 p32 = permute(p3 + Pi.z);
      vec3 p33 = permute(p3 + Pi.z + 1.0);

      vec3 ox11 = fract(p11*K) - Ko;
      vec3 oy11 = mod7(floor(p11*K))*K - Ko;
      vec3 oz11 = floor(p11*K2)*Kz - Kzo;

      vec3 ox12 = fract(p12*K) - Ko;
      vec3 oy12 = mod7(floor(p12*K))*K - Ko;
      vec3 oz12 = floor(p12*K2)*Kz - Kzo;

      vec3 ox13 = fract(p13*K) - Ko;
      vec3 oy13 = mod7(floor(p13*K))*K - Ko;
      vec3 oz13 = floor(p13*K2)*Kz - Kzo;

      vec3 ox21 = fract(p21*K) - Ko;
      vec3 oy21 = mod7(floor(p21*K))*K - Ko;
      vec3 oz21 = floor(p21*K2)*Kz - Kzo;

      vec3 ox22 = fract(p22*K) - Ko;
      vec3 oy22 = mod7(floor(p22*K))*K - Ko;
      vec3 oz22 = floor(p22*K2)*Kz - Kzo;

      vec3 ox23 = fract(p23*K) - Ko;
      vec3 oy23 = mod7(floor(p23*K))*K - Ko;
      vec3 oz23 = floor(p23*K2)*Kz - Kzo;

      vec3 ox31 = fract(p31*K) - Ko;
      vec3 oy31 = mod7(floor(p31*K))*K - Ko;
      vec3 oz31 = floor(p31*K2)*Kz - Kzo;

      vec3 ox32 = fract(p32*K) - Ko;
      vec3 oy32 = mod7(floor(p32*K))*K - Ko;
      vec3 oz32 = floor(p32*K2)*Kz - Kzo;

      vec3 ox33 = fract(p33*K) - Ko;
      vec3 oy33 = mod7(floor(p33*K))*K - Ko;
      vec3 oz33 = floor(p33*K2)*Kz - Kzo;

      vec3 dx11 = Pfx + jitter*ox11;
      vec3 dy11 = Pfy.x + jitter*oy11;
      vec3 dz11 = Pfz.x + jitter*oz11;

      vec3 dx12 = Pfx + jitter*ox12;
      vec3 dy12 = Pfy.x + jitter*oy12;
      vec3 dz12 = Pfz.y + jitter*oz12;

      vec3 dx13 = Pfx + jitter*ox13;
      vec3 dy13 = Pfy.x + jitter*oy13;
      vec3 dz13 = Pfz.z + jitter*oz13;

      vec3 dx21 = Pfx + jitter*ox21;
      vec3 dy21 = Pfy.y + jitter*oy21;
      vec3 dz21 = Pfz.x + jitter*oz21;

      vec3 dx22 = Pfx + jitter*ox22;
      vec3 dy22 = Pfy.y + jitter*oy22;
      vec3 dz22 = Pfz.y + jitter*oz22;

      vec3 dx23 = Pfx + jitter*ox23;
      vec3 dy23 = Pfy.y + jitter*oy23;
      vec3 dz23 = Pfz.z + jitter*oz23;

      vec3 dx31 = Pfx + jitter*ox31;
      vec3 dy31 = Pfy.z + jitter*oy31;
      vec3 dz31 = Pfz.x + jitter*oz31;

      vec3 dx32 = Pfx + jitter*ox32;
      vec3 dy32 = Pfy.z + jitter*oy32;
      vec3 dz32 = Pfz.y + jitter*oz32;

      vec3 dx33 = Pfx + jitter*ox33;
      vec3 dy33 = Pfy.z + jitter*oy33;
      vec3 dz33 = Pfz.z + jitter*oz33;

      vec3 d11 = dx11 * dx11 + dy11 * dy11 + dz11 * dz11;
      vec3 d12 = dx12 * dx12 + dy12 * dy12 + dz12 * dz12;
      vec3 d13 = dx13 * dx13 + dy13 * dy13 + dz13 * dz13;
      vec3 d21 = dx21 * dx21 + dy21 * dy21 + dz21 * dz21;
      vec3 d22 = dx22 * dx22 + dy22 * dy22 + dz22 * dz22;
      vec3 d23 = dx23 * dx23 + dy23 * dy23 + dz23 * dz23;
      vec3 d31 = dx31 * dx31 + dy31 * dy31 + dz31 * dz31;
      vec3 d32 = dx32 * dx32 + dy32 * dy32 + dz32 * dz32;
      vec3 d33 = dx33 * dx33 + dy33 * dy33 + dz33 * dz33;
  #if 0
      vec3 d1 = min(min(d11,d12), d13);
      vec3 d2 = min(min(d21,d22), d23);
      vec3 d3 = min(min(d31,d32), d33);
      vec3 d = min(min(d1,d2), d3);
      d.x = min(min(d.x,d.y),d.z);
      return vec2(sqrt(d.x));
  #else
      vec3 d1a = min(d11, d12);
      d12 = max(d11, d12);
      d11 = min(d1a, d13);
      d13 = max(d1a, d13);
      d12 = min(d12, d13);
      vec3 d2a = min(d21, d22);
      d22 = max(d21, d22);
      d21 = min(d2a, d23);
      d23 = max(d2a, d23);
      d22 = min(d22, d23);
      vec3 d3a = min(d31, d32);
      d32 = max(d31, d32);
      d31 = min(d3a, d33);
      d33 = max(d3a, d33);
      d32 = min(d32, d33);
      vec3 da = min(d11, d21);
      d21 = max(d11, d21);
      d11 = min(da, d31);
      d31 = max(da, d31);
      d11.xy = (d11.x < d11.y) ? d11.xy : d11.yx;
      d11.xz = (d11.x < d11.z) ? d11.xz : d11.zx;
      d12 = min(d12, d21);
      d12 = min(d12, d22);
      d12 = min(d12, d31);
      d12 = min(d12, d32);
      d11.yz = min(d11.yz,d12.xy);
      d11.y = min(d11.y,d12.z);
      d11.y = min(d11.y,d11.z);
      return sqrt(d11.xy);
  #endif
  }
`;

export const classicnoise2D = `
vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}


float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}


float pnoise(vec2 P, vec2 rep)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, rep.xyxy);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
`;
export const classicnoise3D = `
vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}


float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}


float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep);
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

export const classicnoise4D = `
vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 fade(vec4 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}


float cnoise(vec4 P)
{
  vec4 Pi0 = floor(P);
  vec4 Pi1 = Pi0 + 1.0;
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec4 Pf0 = fract(P);
  vec4 Pf1 = Pf0 - 1.0;
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = vec4(Pi0.zzzz);
  vec4 iz1 = vec4(Pi1.zzzz);
  vec4 iw0 = vec4(Pi0.wwww);
  vec4 iw1 = vec4(Pi1.wwww);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 ixy00 = permute(ixy0 + iw0);
  vec4 ixy01 = permute(ixy0 + iw1);
  vec4 ixy10 = permute(ixy1 + iw0);
  vec4 ixy11 = permute(ixy1 + iw1);

  vec4 gx00 = ixy00 * (1.0 / 7.0);
  vec4 gy00 = floor(gx00) * (1.0 / 7.0);
  vec4 gz00 = floor(gy00) * (1.0 / 6.0);
  gx00 = fract(gx00) - 0.5;
  gy00 = fract(gy00) - 0.5;
  gz00 = fract(gz00) - 0.5;
  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
  vec4 sw00 = step(gw00, vec4(0.0));
  gx00 -= sw00 * (step(0.0, gx00) - 0.5);
  gy00 -= sw00 * (step(0.0, gy00) - 0.5);

  vec4 gx01 = ixy01 * (1.0 / 7.0);
  vec4 gy01 = floor(gx01) * (1.0 / 7.0);
  vec4 gz01 = floor(gy01) * (1.0 / 6.0);
  gx01 = fract(gx01) - 0.5;
  gy01 = fract(gy01) - 0.5;
  gz01 = fract(gz01) - 0.5;
  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
  vec4 sw01 = step(gw01, vec4(0.0));
  gx01 -= sw01 * (step(0.0, gx01) - 0.5);
  gy01 -= sw01 * (step(0.0, gy01) - 0.5);

  vec4 gx10 = ixy10 * (1.0 / 7.0);
  vec4 gy10 = floor(gx10) * (1.0 / 7.0);
  vec4 gz10 = floor(gy10) * (1.0 / 6.0);
  gx10 = fract(gx10) - 0.5;
  gy10 = fract(gy10) - 0.5;
  gz10 = fract(gz10) - 0.5;
  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
  vec4 sw10 = step(gw10, vec4(0.0));
  gx10 -= sw10 * (step(0.0, gx10) - 0.5);
  gy10 -= sw10 * (step(0.0, gy10) - 0.5);

  vec4 gx11 = ixy11 * (1.0 / 7.0);
  vec4 gy11 = floor(gx11) * (1.0 / 7.0);
  vec4 gz11 = floor(gy11) * (1.0 / 6.0);
  gx11 = fract(gx11) - 0.5;
  gy11 = fract(gy11) - 0.5;
  gz11 = fract(gz11) - 0.5;
  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
  vec4 sw11 = step(gw11, vec4(0.0));
  gx11 -= sw11 * (step(0.0, gx11) - 0.5);
  gy11 -= sw11 * (step(0.0, gy11) - 0.5);

  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

  vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
  g0000 *= norm00.x;
  g0100 *= norm00.y;
  g1000 *= norm00.z;
  g1100 *= norm00.w;

  vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
  g0001 *= norm01.x;
  g0101 *= norm01.y;
  g1001 *= norm01.z;
  g1101 *= norm01.w;

  vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
  g0010 *= norm10.x;
  g0110 *= norm10.y;
  g1010 *= norm10.z;
  g1110 *= norm10.w;

  vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
  g0011 *= norm11.x;
  g0111 *= norm11.y;
  g1011 *= norm11.z;
  g1111 *= norm11.w;

  float n0000 = dot(g0000, Pf0);
  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
  float n1111 = dot(g1111, Pf1);

  vec4 fade_xyzw = fade(Pf0);
  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
  return 2.2 * n_xyzw;
}


float pnoise(vec4 P, vec4 rep)
{
  vec4 Pi0 = mod(floor(P), rep);
  vec4 Pi1 = mod(Pi0 + 1.0, rep);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec4 Pf0 = fract(P);
  vec4 Pf1 = Pf0 - 1.0;
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = vec4(Pi0.zzzz);
  vec4 iz1 = vec4(Pi1.zzzz);
  vec4 iw0 = vec4(Pi0.wwww);
  vec4 iw1 = vec4(Pi1.wwww);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 ixy00 = permute(ixy0 + iw0);
  vec4 ixy01 = permute(ixy0 + iw1);
  vec4 ixy10 = permute(ixy1 + iw0);
  vec4 ixy11 = permute(ixy1 + iw1);

  vec4 gx00 = ixy00 * (1.0 / 7.0);
  vec4 gy00 = floor(gx00) * (1.0 / 7.0);
  vec4 gz00 = floor(gy00) * (1.0 / 6.0);
  gx00 = fract(gx00) - 0.5;
  gy00 = fract(gy00) - 0.5;
  gz00 = fract(gz00) - 0.5;
  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
  vec4 sw00 = step(gw00, vec4(0.0));
  gx00 -= sw00 * (step(0.0, gx00) - 0.5);
  gy00 -= sw00 * (step(0.0, gy00) - 0.5);

  vec4 gx01 = ixy01 * (1.0 / 7.0);
  vec4 gy01 = floor(gx01) * (1.0 / 7.0);
  vec4 gz01 = floor(gy01) * (1.0 / 6.0);
  gx01 = fract(gx01) - 0.5;
  gy01 = fract(gy01) - 0.5;
  gz01 = fract(gz01) - 0.5;
  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
  vec4 sw01 = step(gw01, vec4(0.0));
  gx01 -= sw01 * (step(0.0, gx01) - 0.5);
  gy01 -= sw01 * (step(0.0, gy01) - 0.5);

  vec4 gx10 = ixy10 * (1.0 / 7.0);
  vec4 gy10 = floor(gx10) * (1.0 / 7.0);
  vec4 gz10 = floor(gy10) * (1.0 / 6.0);
  gx10 = fract(gx10) - 0.5;
  gy10 = fract(gy10) - 0.5;
  gz10 = fract(gz10) - 0.5;
  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
  vec4 sw10 = step(gw10, vec4(0.0));
  gx10 -= sw10 * (step(0.0, gx10) - 0.5);
  gy10 -= sw10 * (step(0.0, gy10) - 0.5);

  vec4 gx11 = ixy11 * (1.0 / 7.0);
  vec4 gy11 = floor(gx11) * (1.0 / 7.0);
  vec4 gz11 = floor(gy11) * (1.0 / 6.0);
  gx11 = fract(gx11) - 0.5;
  gy11 = fract(gy11) - 0.5;
  gz11 = fract(gz11) - 0.5;
  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
  vec4 sw11 = step(gw11, vec4(0.0));
  gx11 -= sw11 * (step(0.0, gx11) - 0.5);
  gy11 -= sw11 * (step(0.0, gy11) - 0.5);

  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

  vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
  g0000 *= norm00.x;
  g0100 *= norm00.y;
  g1000 *= norm00.z;
  g1100 *= norm00.w;

  vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
  g0001 *= norm01.x;
  g0101 *= norm01.y;
  g1001 *= norm01.z;
  g1101 *= norm01.w;

  vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
  g0010 *= norm10.x;
  g0110 *= norm10.y;
  g1010 *= norm10.z;
  g1110 *= norm10.w;

  vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
  g0011 *= norm11.x;
  g0111 *= norm11.y;
  g1011 *= norm11.z;
  g1111 *= norm11.w;

  float n0000 = dot(g0000, Pf0);
  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
  float n1111 = dot(g1111, Pf1);

  vec4 fade_xyzw = fade(Pf0);
  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
  return 2.2 * n_xyzw;
}
`;

export const noise2D = `

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  float snoise(vec2 v)
    {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  `;

export const noise3D = `
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 permute(vec4 x) {
       return mod289(((x*34.0)+1.0)*x);
  }
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  float snoise(vec3 v)
    {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),dot(p2,x2), dot(p3,x3) ) );
    }
`;

export const noise3Dgrad = `

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 permute(vec4 x) {
       return mod289(((x*34.0)+1.0)*x);
  }
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  float snoise(vec3 v, out vec3 gradient)
  {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    vec4 m2 = m * m;
    vec4 m4 = m2 * m2;
    vec4 pdotx = vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3));
    vec4 temp = m2 * m * pdotx;
    gradient = -8.0 * (temp.x * x0 + temp.y * x1 + temp.z * x2 + temp.w * x3);
    gradient += m4.x * p0 + m4.y * p1 + m4.z * p2 + m4.w * p3;
    gradient *= 42.0;
    return 42.0 * dot(m4, pdotx);
  }
`;

export const noise4D = `
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0; }
  float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) {
       return mod289(((x*34.0)+1.0)*x);
  }
  float permute(float x) {
       return mod289(((x*34.0)+1.0)*x);
  }
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  float taylorInvSqrt(float r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  vec4 grad4(float j, vec4 ip)
    {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p,s;
    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
    return p;
    }
  #define F4 0.309016994374947451
  float snoise(vec4 v)
    {
    const vec4  C = vec4( 0.138196601125011,
                          0.276393202250021,
                          0.414589803375032,
                         -0.447213595499958);
    vec4 i  = floor(v + dot(v, vec4(F4)) );
    vec4 x0 = v -   i + dot(i, C.xxxx);
    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;
    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
    vec4 x1 = x0 - i1 + C.xxxx;
    vec4 x2 = x0 - i2 + C.yyyy;
    vec4 x3 = x0 - i3 + C.zzzz;
    vec4 x4 = x0 + C.wwww;
    i = mod289(i);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
               i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
             + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
             + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
             + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
    vec4 p0 = grad4(j0,   ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4,p4));
    vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                 + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
    }
`;
export const psrdnoise2D = `
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  vec2 rgrad2(vec2 p, float rot) {
  #if 0
    float u = permute(permute(p.x) + p.y) * 0.0243902439 + rot;
    u = 4.0 * fract(u) - 2.0;
    return vec2(abs(u)-1.0, abs(abs(u+1.0)-2.0)-1.0);
  #else

    float u = permute(permute(p.x) + p.y) * 0.0243902439 + rot;
    u = fract(u) * 6.28318530718;
    return vec2(cos(u), sin(u));
  #endif
  }
  vec3 psrdnoise(vec2 pos, vec2 per, float rot) {
    pos.y += 0.01;
    vec2 uv = vec2(pos.x + pos.y*0.5, pos.y);
    vec2 i0 = floor(uv);
    vec2 f0 = fract(uv);
    vec2 i1 = (f0.x > f0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 p0 = vec2(i0.x - i0.y * 0.5, i0.y);
    vec2 p1 = vec2(p0.x + i1.x - i1.y * 0.5, p0.y + i1.y);
    vec2 p2 = vec2(p0.x + 0.5, p0.y + 1.0);
    i1 = i0 + i1;
    vec2 i2 = i0 + vec2(1.0, 1.0);
    vec2 d0 = pos - p0;
    vec2 d1 = pos - p1;
    vec2 d2 = pos - p2;
    vec3 xw = mod(vec3(p0.x, p1.x, p2.x), per.x);
    vec3 yw = mod(vec3(p0.y, p1.y, p2.y), per.y);
    vec3 iuw = xw + 0.5 * yw;
    vec3 ivw = yw;
    vec2 g0 = rgrad2(vec2(iuw.x, ivw.x), rot);
    vec2 g1 = rgrad2(vec2(iuw.y, ivw.y), rot);
    vec2 g2 = rgrad2(vec2(iuw.z, ivw.z), rot);
    vec3 w = vec3(dot(g0, d0), dot(g1, d1), dot(g2, d2));
    vec3 t = 0.8 - vec3(dot(d0, d0), dot(d1, d1), dot(d2, d2));
    vec3 dtdx = -2.0 * vec3(d0.x, d1.x, d2.x);
    vec3 dtdy = -2.0 * vec3(d0.y, d1.y, d2.y);
    if (t.x < 0.0) {
      dtdx.x = 0.0;
      dtdy.x = 0.0;
      t.x = 0.0;
    }
    if (t.y < 0.0) {
      dtdx.y = 0.0;
      dtdy.y = 0.0;
      t.y = 0.0;
    }
    if (t.z < 0.0) {
      dtdx.z = 0.0;
      dtdy.z = 0.0;
      t.z = 0.0;
    }
    vec3 t2 = t * t;
    vec3 t4 = t2 * t2;
    vec3 t3 = t2 * t;
    float n = dot(t4, w);
    vec2 dt0 = vec2(dtdx.x, dtdy.x) * 4.0 * t3.x;
    vec2 dn0 = t4.x * g0 + dt0 * w.x;
    vec2 dt1 = vec2(dtdx.y, dtdy.y) * 4.0 * t3.y;
    vec2 dn1 = t4.y * g1 + dt1 * w.y;
    vec2 dt2 = vec2(dtdx.z, dtdy.z) * 4.0 * t3.z;
    vec2 dn2 = t4.z * g2 + dt2 * w.z;
    return 11.0*vec3(n, dn0 + dn1 + dn2);
  }
  vec3 psdnoise(vec2 pos, vec2 per) {
    return psrdnoise(pos, per, 0.0);
  }
  float psrnoise(vec2 pos, vec2 per, float rot) {
    pos.y += 0.001;
    vec2 uv = vec2(pos.x + pos.y*0.5, pos.y);
    vec2 i0 = floor(uv);
    vec2 f0 = fract(uv);
    vec2 i1 = (f0.x > f0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 p0 = vec2(i0.x - i0.y * 0.5, i0.y);
    vec2 p1 = vec2(p0.x + i1.x - i1.y * 0.5, p0.y + i1.y);
    vec2 p2 = vec2(p0.x + 0.5, p0.y + 1.0);
    i1 = i0 + i1;
    vec2 i2 = i0 + vec2(1.0, 1.0);
    vec2 d0 = pos - p0;
    vec2 d1 = pos - p1;
    vec2 d2 = pos - p2;
    vec3 xw = mod(vec3(p0.x, p1.x, p2.x), per.x);
    vec3 yw = mod(vec3(p0.y, p1.y, p2.y), per.y);
    vec3 iuw = xw + 0.5 * yw;
    vec3 ivw = yw;
    vec2 g0 = rgrad2(vec2(iuw.x, ivw.x), rot);
    vec2 g1 = rgrad2(vec2(iuw.y, ivw.y), rot);
    vec2 g2 = rgrad2(vec2(iuw.z, ivw.z), rot);
    vec3 w = vec3(dot(g0, d0), dot(g1, d1), dot(g2, d2));
    vec3 t = 0.8 - vec3(dot(d0, d0), dot(d1, d1), dot(d2, d2));
    t = max(t, 0.0);
    vec3 t2 = t * t;
    vec3 t4 = t2 * t2;
    float n = dot(t4, w);
    return 11.0*n;
  }
  float psnoise(vec2 pos, vec2 per) {
    return psrnoise(pos, per, 0.0);
  }
  vec3 srdnoise(vec2 pos, float rot) {
    pos.y += 0.001;
    vec2 uv = vec2(pos.x + pos.y*0.5, pos.y);
    vec2 i0 = floor(uv);
    vec2 f0 = fract(uv);
    vec2 i1 = (f0.x > f0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 p0 = vec2(i0.x - i0.y * 0.5, i0.y);
    vec2 p1 = vec2(p0.x + i1.x - i1.y * 0.5, p0.y + i1.y);
    vec2 p2 = vec2(p0.x + 0.5, p0.y + 1.0);
    i1 = i0 + i1;
    vec2 i2 = i0 + vec2(1.0, 1.0);
    vec2 d0 = pos - p0;
    vec2 d1 = pos - p1;
    vec2 d2 = pos - p2;
    vec3 x = vec3(p0.x, p1.x, p2.x);
    vec3 y = vec3(p0.y, p1.y, p2.y);
    vec3 iuw = x + 0.5 * y;
    vec3 ivw = y;
    iuw = mod289(iuw);
    ivw = mod289(ivw);
    vec2 g0 = rgrad2(vec2(iuw.x, ivw.x), rot);
    vec2 g1 = rgrad2(vec2(iuw.y, ivw.y), rot);
    vec2 g2 = rgrad2(vec2(iuw.z, ivw.z), rot);
    vec3 w = vec3(dot(g0, d0), dot(g1, d1), dot(g2, d2));
    vec3 t = 0.8 - vec3(dot(d0, d0), dot(d1, d1), dot(d2, d2));
    vec3 dtdx = -2.0 * vec3(d0.x, d1.x, d2.x);
    vec3 dtdy = -2.0 * vec3(d0.y, d1.y, d2.y);
    if (t.x < 0.0) {
      dtdx.x = 0.0;
      dtdy.x = 0.0;
      t.x = 0.0;
    }
    if (t.y < 0.0) {
      dtdx.y = 0.0;
      dtdy.y = 0.0;
      t.y = 0.0;
    }
    if (t.z < 0.0) {
      dtdx.z = 0.0;
      dtdy.z = 0.0;
      t.z = 0.0;
    }
    vec3 t2 = t * t;
    vec3 t4 = t2 * t2;
    vec3 t3 = t2 * t;
    float n = dot(t4, w);
    vec2 dt0 = vec2(dtdx.x, dtdy.x) * 4.0 * t3.x;
    vec2 dn0 = t4.x * g0 + dt0 * w.x;
    vec2 dt1 = vec2(dtdx.y, dtdy.y) * 4.0 * t3.y;
    vec2 dn1 = t4.y * g1 + dt1 * w.y;
    vec2 dt2 = vec2(dtdx.z, dtdy.z) * 4.0 * t3.z;
    vec2 dn2 = t4.z * g2 + dt2 * w.z;
    return 11.0*vec3(n, dn0 + dn1 + dn2);
  }
  vec3 sdnoise(vec2 pos) {
    return srdnoise(pos, 0.0);
  }
  float srnoise(vec2 pos, float rot) {
    pos.y += 0.001;
    vec2 uv = vec2(pos.x + pos.y*0.5, pos.y);
    vec2 i0 = floor(uv);
    vec2 f0 = fract(uv);
    vec2 i1 = (f0.x > f0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 p0 = vec2(i0.x - i0.y * 0.5, i0.y);
    vec2 p1 = vec2(p0.x + i1.x - i1.y * 0.5, p0.y + i1.y);
    vec2 p2 = vec2(p0.x + 0.5, p0.y + 1.0);
    i1 = i0 + i1;
    vec2 i2 = i0 + vec2(1.0, 1.0);
    vec2 d0 = pos - p0;
    vec2 d1 = pos - p1;
    vec2 d2 = pos - p2;
    vec3 x = vec3(p0.x, p1.x, p2.x);
    vec3 y = vec3(p0.y, p1.y, p2.y);
    vec3 iuw = x + 0.5 * y;
    vec3 ivw = y;
    iuw = mod289(iuw);
    ivw = mod289(ivw);
    vec2 g0 = rgrad2(vec2(iuw.x, ivw.x), rot);
    vec2 g1 = rgrad2(vec2(iuw.y, ivw.y), rot);
    vec2 g2 = rgrad2(vec2(iuw.z, ivw.z), rot);
    vec3 w = vec3(dot(g0, d0), dot(g1, d1), dot(g2, d2));
    vec3 t = 0.8 - vec3(dot(d0, d0), dot(d1, d1), dot(d2, d2));
    t = max(t, 0.0);
    vec3 t2 = t * t;
    vec3 t4 = t2 * t2;
    float n = dot(t4, w);
    return 11.0*n;
  }
  float snoise(vec2 pos) {
    return srnoise(pos, 0.0);
  }
`;
