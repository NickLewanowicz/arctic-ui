export default function(){
  this.transition(
    this.matchSelector('.crossFade-modal'),
    this.use('crossFade', {duration:300}),
    this.reverse('crossFade', {duration:300})
  );

  this.transition(
    this.matchSelector('.toLeft-demo'),
    this.use('toLeft', {duration:300}),
    this.reverse('toRight', {duration:300})
  );
  this.transition(
    this.fromRoute('index'),
    this.toRoute('repositories'),
    this.use('toUp'),
    this.reverse('crossFade')
  );
  this.transition(
    this.withinRoute('repositories'),
    this.use('crossFade')
  );
  this.transition(
    this.fromRoute('index'),
    this.use('crossFade', {duration:500}),
    this.reverse('crossFade', {duration:300})
  );
}
