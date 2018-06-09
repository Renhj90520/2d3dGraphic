export default class TimerModel {
  private static _instance: TimerModel;

  // 当前时间
  private _time = 0;
  // 时间经过百分比
  private _timeRatio = 1;
  get timeRatio() {
    return this._timeRatio;
  }
  public static getInstance() {
    return TimerModel._instance || new TimerModel();
  }

  constructor() {
    TimerModel._instance = this;
  }

  public updateTimeRatio() {
    const lastTime = this._time;
    if (lastTime > 0) {
      // 每frame的时间（毫秒）
      const FPS_60_SEC = 1000 / 60;
      // 设置时间差
      const dTime = new Date().getTime() - lastTime;
      // 设置和FPS60的比较系数
      this._timeRatio = dTime / FPS_60_SEC;
    } else {
      this._timeRatio = 1;
    }

    this._time = new Date().getTime();
  }
}
