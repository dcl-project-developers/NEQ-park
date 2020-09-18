using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Path_script : MonoBehaviour
{
    public enum OnFinishPathBehavior { Stop, Loop, Reverse, NextPath };

    public int globalPathSpeed = 8;
    public OnFinishPathBehavior onFinish = OnFinishPathBehavior.Stop;

    // Start is called before the first frame update
    void Start()
    {
        
    }

}
