import utils from "./dclutils"

import * as game from "./game" // First execute this (entities creation, models loading, etc.)

// Run owl animation
let owl = utils.getEntityWithName("mesh_animation_owl_01")
log(owl)
let owlAnimator = new Animator()
const owlLoopState = new AnimationState("mesh_animation_owl_01")
owlAnimator.addClip(owlLoopState)

owl.addComponent(owlAnimator)

owlLoopState.play()

// Run cheetah animation
let cheetah = utils.getEntityWithName("mesh_animation_cat_sleep_01")

let cheetahAnimator = new Animator()
const cheetahLoopState = new AnimationState("mesh_animation_cat_sleep_01")
cheetahAnimator.addClip(cheetahLoopState)

cheetah.addComponent(cheetahAnimator)

cheetahLoopState.play()
