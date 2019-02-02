const calculateFirstPendulumAcceleration1 = (gravity, pendulum1, pendulum2)  => {
    const num_1 = -gravity * (2 * pendulum1.mass + pendulum2.mass) * sin(pendulum1.angle);
    const num_2 = -m2 * gravity * sin(pendulum1.angle - 2 * pendulum2.angle);
    const num_3 = -2 * sin(pendulum1.angle - pendulum2.angle) * pendulum2.mass;
    const num_4 =  pendulum2.velocity * pendulum2.velocity * pendulum2.radius + pendulum1.velocity * pendulum1.velocity * pendulum1.radius * cos(pendulum1.angle - pendulum2.angle);
    const denum = pendulum1.radius * (2 * pendulum1.mass + pendulum2.mass - pendulum2.mass * cos(2 * pendulum1.angle - 2 * pendulum2.angle));
    return (num_1 + num_2 + num_3 * num_4) / denum;
}

const calculateSecondPendulumAcceleration1 = (gravity, pendulum1, pendulum2)  => {
    const num_1 = 2 * sin(pendulum1.angle - pendulum2.angle);
    const num_2 = pendulum1.velocity * pendulum1.velocity * pendulum1.radius * (pendulum1.mass + pendulum2.mass);
    const num_3 = gravity * (pendulum1.mass + pendulum2.mass) * cos(pendulum1.angle);
    const num_4 = pendulum2.velocity * pendulum2.velocity * pendulum2.radius * pendulum2.mass * cos(pendulum1.angle - pendulum2.angle);
    const denum = pendulum2.radius * (2 * pendulum1.mass + pendulum2.mass - pendulum2.mass * cos(2 * pendulum1.angle - 2 * pendulum2.angle));
    return (num_1 * (num_2 + num_3 + num_4)) / denum;
}